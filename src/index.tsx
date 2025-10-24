import React, { useState, useEffect, useRef } from 'react'

const HIJRI_MONTHS_EN = [
  'Muharram', 'Safar', "Rabi' al-awwal", "Rabi' al-thani",
  'Jumada al-awwal', 'Jumada al-thani', 'Rajab', "Sha'ban",
  'Ramadan', 'Shawwal', "Dhu al-Qa'dah", 'Dhu al-Hijjah'
]

const HIJRI_MONTHS_AR = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر',
  'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
]

const WEEKDAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const WEEKDAYS_AR = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س']

export interface HijriDatePickerProps {
  value?: string
  onChange?: (value: string, gregorianDate?: Date) => void
  format?: 'YYYY-MM-DD' | 'D MMMM YYYY' | 'DD/MM/YYYY' | 'MM/DD/YYYY'
  placeholder?: string
  locale?: 'en' | 'ar'
  disabled?: boolean
  readOnly?: boolean
  clearable?: boolean
  showGregorianEquivalent?: boolean
  minDate?: string
  maxDate?: string
  disabledDates?: string[]
  highlightedDates?: string[]
  optionsStartYear?: number
  optionsEndYear?: number
  firstDayOfWeek?: 0 | 1
  showWeekNumbers?: boolean
  allowManualInput?: boolean
  closeOnSelect?: boolean
  showTodayButton?: boolean
  customDayRenderer?: (day: number, date: { hy: number; hm: number; hd: number }) => React.ReactNode
  onOpen?: () => void
  onClose?: () => void
  popupPosition?: 'bottom' | 'top' | 'auto'
  className?: string
  containerClassName?: string
  inputClassName?: string
  popupClassName?: string
  theme?: 'light' | 'dark' | 'custom'
  customColors?: {
    primary?: string
    background?: string
    text?: string
    border?: string
    hover?: string
    selected?: string
    disabled?: string
  }
}

export default function HijriDatePicker({
  value,
  onChange,
  format = 'YYYY-MM-DD',
  placeholder = 'Select Hijri date',
  locale = 'en',
  disabled = false,
  readOnly = false,
  clearable = true,
  showGregorianEquivalent = false,
  minDate,
  maxDate,
  disabledDates = [],
  highlightedDates = [],
  optionsStartYear = 1400,
  optionsEndYear = 1500,
  firstDayOfWeek = 0,
  showWeekNumbers = false,
  allowManualInput = false,
  closeOnSelect = true,
  showTodayButton = true,
  customDayRenderer,
  onOpen,
  onClose,
  popupPosition = 'auto',
  className = '',
  containerClassName = '',
  inputClassName = '',
  popupClassName = '',
  theme = 'light',
  customColors = {}
}: HijriDatePickerProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<{ hy: number; hm: number; hd: number } | null>(null)
  const [display, setDisplay] = useState<{ hy: number; hm: number }>({ hy: 1446, hm: 1 })
  const [inputValue, setInputValue] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const colors = {
    primary: customColors.primary || (theme === 'dark' ? '#60a5fa' : '#3b82f6'),
    background: customColors.background || (theme === 'dark' ? '#1f2937' : '#ffffff'),
    text: customColors.text || (theme === 'dark' ? '#f3f4f6' : '#111827'),
    border: customColors.border || (theme === 'dark' ? '#374151' : '#d1d5db'),
    hover: customColors.hover || (theme === 'dark' ? '#374151' : '#f3f4f6'),
    selected: customColors.selected || (theme === 'dark' ? '#2563eb' : '#3b82f6'),
    disabled: customColors.disabled || (theme === 'dark' ? '#4b5563' : '#9ca3af')
  }

  function hijriToGregorian(hy: number, hm: number, hd: number): Date {
    const days = Math.floor((hy - 1) * 354.367 + (hm - 1) * 29.53 + (hd - 1))
    const gDate = new Date(622, 6, 16)
    gDate.setDate(gDate.getDate() + days)
    return gDate
  }

  function gregorianToHijri(date: Date): { hy: number; hm: number; hd: number } {
    const diffDays = Math.floor(
      (date.getTime() - new Date(622, 6, 16).getTime()) / (1000 * 60 * 60 * 24)
    )
    const hy = Math.floor(diffDays / 354.367) + 1
    const remDays = diffDays % 354.367
    const hm = Math.floor(remDays / 29.53) + 1
    const hd = Math.floor(remDays % 29.53) + 1
    return { hy, hm, hd }
  }

  function parseHijriString(value: string): { hy: number; hm: number; hd: number } | null {
    const formats = [
      /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
      /^(\d{1,2})-(\d{1,2})-(\d{4})$/
    ]
    
    for (const regex of formats) {
      const match = value.match(regex)
      if (match) {
        const [, a, b, c] = match
        if (regex.source.startsWith('^(\\d{4})')) {
          return { hy: Number(a), hm: Number(b), hd: Number(c) }
        } else {
          return { hy: Number(c), hm: Number(b), hd: Number(a) }
        }
      }
    }
    return null
  }

  function formatHijriDate(date: { hy: number; hm: number; hd: number }, fmt: string): string {
    const MONTHS = locale === 'ar' ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN
    
    switch (fmt) {
      case 'YYYY-MM-DD':
        return `${date.hy}-${String(date.hm).padStart(2, '0')}-${String(date.hd).padStart(2, '0')}`
      case 'D MMMM YYYY':
        return `${date.hd} ${MONTHS[date.hm - 1]} ${date.hy}`
      case 'DD/MM/YYYY':
        return `${String(date.hd).padStart(2, '0')}/${String(date.hm).padStart(2, '0')}/${date.hy}`
      case 'MM/DD/YYYY':
        return `${String(date.hm).padStart(2, '0')}/${String(date.hd).padStart(2, '0')}/${date.hy}`
      default:
        return `${date.hy}-${date.hm}-${date.hd}`
    }
  }

  function isDateDisabled(date: { hy: number; hm: number; hd: number }): boolean {
    const dateStr = formatHijriDate(date, 'YYYY-MM-DD')
    
    if (disabledDates.includes(dateStr)) return true
    
    if (minDate) {
      const min = parseHijriString(minDate)
      if (min && compareHijriDates(date, min) < 0) return true
    }
    
    if (maxDate) {
      const max = parseHijriString(maxDate)
      if (max && compareHijriDates(date, max) > 0) return true
    }
    
    return false
  }

  function compareHijriDates(a: { hy: number; hm: number; hd: number }, b: { hy: number; hm: number; hd: number }): number {
    if (a.hy !== b.hy) return a.hy - b.hy
    if (a.hm !== b.hm) return a.hm - b.hm
    return a.hd - b.hd
  }

  function isDateHighlighted(date: { hy: number; hm: number; hd: number }): boolean {
    const dateStr = formatHijriDate(date, 'YYYY-MM-DD')
    return highlightedDates.includes(dateStr)
  }

  useEffect(() => {
    if (value) {
      const parsed = parseHijriString(value)
      if (parsed) {
        setSelected(parsed)
        setDisplay({ hy: parsed.hy, hm: parsed.hm })
        setInputValue(formatHijriDate(parsed, format))
      }
    } else {
      setInputValue('')
    }
  }, [value, format])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (open) {
          setOpen(false)
          onClose?.()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, onClose])

  const getDaysInMonth = () => Array.from({ length: 30 }, (_, i) => i + 1)
  
  const getFirstDayOffset = () => {
    const firstDay = hijriToGregorian(display.hy, display.hm, 1)
    let offset = firstDay.getDay() - firstDayOfWeek
    if (offset < 0) offset += 7
    return offset
  }

  const handleSelect = (day: number) => {
    const newDate = { hy: display.hy, hm: display.hm, hd: day }
    
    if (isDateDisabled(newDate)) return
    
    setSelected(newDate)
    const formatted = formatHijriDate(newDate, format)
    setInputValue(formatted)
    const gregorian = hijriToGregorian(newDate.hy, newDate.hm, newDate.hd)
    onChange?.(formatted, gregorian)
    
    if (closeOnSelect) {
      setOpen(false)
      onClose?.()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    
    if (allowManualInput) {
      const parsed = parseHijriString(val)
      if (parsed && !isDateDisabled(parsed)) {
        setSelected(parsed)
        setDisplay({ hy: parsed.hy, hm: parsed.hm })
        const gregorian = hijriToGregorian(parsed.hy, parsed.hm, parsed.hd)
        onChange?.(formatHijriDate(parsed, format), gregorian)
      }
    }
  }

  const handlePrev = () => {
    setDisplay(prev => (prev.hm === 1 ? { hy: prev.hy - 1, hm: 12 } : { ...prev, hm: prev.hm - 1 }))
  }

  const handleNext = () => {
    setDisplay(prev => (prev.hm === 12 ? { hy: prev.hy + 1, hm: 1 } : { ...prev, hm: prev.hm + 1 }))
  }

  const handleClear = () => {
    setSelected(null)
    setInputValue('')
    onChange?.('', undefined)
  }

  const handleToday = () => {
    const today = gregorianToHijri(new Date())
    setSelected(today)
    setDisplay({ hy: today.hy, hm: today.hm })
    const formatted = formatHijriDate(today, format)
    setInputValue(formatted)
    const gregorian = new Date()
    onChange?.(formatted, gregorian)
    
    if (closeOnSelect) {
      setOpen(false)
      onClose?.()
    }
  }

  const handleOpenToggle = () => {
    if (disabled || readOnly) return
    
    const newOpen = !open
    setOpen(newOpen)
    
    if (newOpen) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }

  const MONTHS = locale === 'ar' ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN
  const WEEKDAYS = locale === 'ar' ? WEEKDAYS_AR : WEEKDAYS_EN
  const days = getDaysInMonth()
  const firstDayOffset = getFirstDayOffset()

  const styles = {
    container: {
      position: 'relative' as const,
      width: '100%',
      maxWidth: '300px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    inputContainer: {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      width: '100%',
      padding: '8px 36px 8px 12px',
      fontSize: '14px',
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      outline: 'none',
      background: colors.background,
      color: colors.text,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1
    },
    icon: {
      position: 'absolute' as const,
      right: '8px',
      width: '20px',
      height: '20px',
      color: colors.text,
      pointerEvents: 'none' as const
    },
    popup: {
      position: 'absolute' as const,
      top: popupPosition === 'top' ? 'auto' : '100%',
      bottom: popupPosition === 'top' ? '100%' : 'auto',
      left: 0,
      marginTop: popupPosition === 'top' ? 0 : '4px',
      marginBottom: popupPosition === 'top' ? '4px' : 0,
      background: colors.background,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      padding: '12px',
      zIndex: 1000,
      minWidth: '280px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
      gap: '8px'
    },
    navBtn: {
      background: 'none',
      border: 'none',
      padding: '4px 8px',
      cursor: 'pointer',
      fontSize: '16px',
      color: colors.text,
      borderRadius: '4px',
      transition: 'background 0.2s'
    },
    monthYear: {
      display: 'flex',
      gap: '8px',
      flex: 1
    },
    select: {
      padding: '4px 8px',
      fontSize: '13px',
      border: `1px solid ${colors.border}`,
      borderRadius: '4px',
      background: colors.background,
      color: colors.text,
      cursor: 'pointer',
      flex: 1
    },
    weekdays: {
      display: 'grid',
      gridTemplateColumns: showWeekNumbers ? 'auto repeat(7, 1fr)' : 'repeat(7, 1fr)',
      gap: '4px',
      marginBottom: '8px',
      fontSize: '12px',
      fontWeight: 600,
      color: colors.text,
      textAlign: 'center' as const
    },
    daysGrid: {
      display: 'grid',
      gridTemplateColumns: showWeekNumbers ? 'auto repeat(7, 1fr)' : 'repeat(7, 1fr)',
      gap: '4px',
      marginBottom: '8px'
    },
    dayBtn: {
      padding: '8px',
      fontSize: '13px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      background: 'none',
      color: colors.text,
      transition: 'all 0.2s',
      fontWeight: 500
    },
    footer: {
      display: 'flex',
      gap: '8px',
      marginTop: '8px'
    },
    btn: {
      padding: '6px 12px',
      fontSize: '13px',
      border: `1px solid ${colors.border}`,
      borderRadius: '4px',
      cursor: 'pointer',
      background: colors.background,
      color: colors.text,
      transition: 'all 0.2s',
      flex: 1
    },
    gregorian: {
      fontSize: '11px',
      color: colors.disabled,
      textAlign: 'center' as const,
      marginTop: '8px',
      padding: '4px'
    }
  }

  return (
    <div style={{ ...styles.container }} className={className} ref={ref}>
      <div style={styles.inputContainer} className={containerClassName}>
        <input
          ref={inputRef}
          value={inputValue}
          placeholder={placeholder}
          onClick={handleOpenToggle}
          onChange={handleInputChange}
          readOnly={!allowManualInput}
          disabled={disabled}
          style={styles.input}
          className={inputClassName}
          name="hijri-date"
        />
        <CalendarIcon style={styles.icon} />
      </div>

      {open && (
        <div style={styles.popup} className={popupClassName}>
          <div style={styles.header}>
            <button
              type="button"
              onClick={handlePrev}
              style={styles.navBtn}
              onMouseEnter={e => e.currentTarget.style.background = colors.hover}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              {locale === 'ar' ? '▶' : '◀'}
            </button>
            <div style={styles.monthYear}>
              <select
                value={display.hm}
                onChange={e => setDisplay({ ...display, hm: Number(e.target.value) })}
                style={styles.select}
              >
                {MONTHS.map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
              <select
                value={display.hy}
                onChange={e => setDisplay({ ...display, hy: Number(e.target.value) })}
                style={styles.select}
              >
                {Array.from(
                  { length: optionsEndYear - optionsStartYear },
                  (_, i) => optionsStartYear + i
                ).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleNext}
              style={styles.navBtn}
              onMouseEnter={e => e.currentTarget.style.background = colors.hover}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              {locale === 'ar' ? '◀' : '▶'}
            </button>
          </div>

          <div style={styles.weekdays}>
            {showWeekNumbers && <div></div>}
            {WEEKDAYS.map(d => <div key={d}>{d}</div>)}
          </div>

          <div style={styles.daysGrid}>
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map(d => {
              const date = { hy: display.hy, hm: display.hm, hd: d }
              const isSelected = selected?.hd === d && selected?.hm === display.hm && selected?.hy === display.hy
              const isDisabled = isDateDisabled(date)
              const isHighlighted = isDateHighlighted(date)
              
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleSelect(d)}
                  disabled={isDisabled}
                  style={{
                    ...styles.dayBtn,
                    background: isSelected ? colors.selected : isHighlighted ? colors.hover : 'none',
                    color: isSelected ? '#fff' : isDisabled ? colors.disabled : colors.text,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    border: isHighlighted && !isSelected ? `1px solid ${colors.primary}` : 'none',
                    opacity: isDisabled ? 0.4 : 1
                  }}
                  onMouseEnter={e => {
                    if (!isSelected && !isDisabled) {
                      e.currentTarget.style.background = colors.hover
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected && !isDisabled) {
                      e.currentTarget.style.background = isHighlighted ? colors.hover : 'none'
                    }
                  }}
                >
                  {customDayRenderer ? customDayRenderer(d, date) : d}
                </button>
              )
            })}
          </div>

          {showGregorianEquivalent && selected && (
            <div style={styles.gregorian}>
             {locale === 'ar' ? 'ميلادى' : 'Gregorian'}: {hijriToGregorian(selected.hy, selected.hm, selected.hd).toLocaleDateString()}
            </div>
          )}

          <div style={styles.footer}>
            {showTodayButton && (
              <button
                type="button"
                onClick={handleToday}
                style={styles.btn}
                onMouseEnter={e => e.currentTarget.style.background = colors.hover}
                onMouseLeave={e => e.currentTarget.style.background = colors.background}
              >
                 {locale === 'ar' ? 'اليوم' : 'Today'}
              </button>
            )}
            {clearable && (
              <button
                type="button"
                onClick={handleClear}
                style={styles.btn}
                onMouseEnter={e => e.currentTarget.style.background = colors.hover}
                onMouseLeave={e => e.currentTarget.style.background = colors.background}
              >
                 {locale === 'ar' ? 'مسح' : 'Clear'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function CalendarIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="12.5" r="0.8" fill="currentColor" />
      <circle cx="12" cy="12.5" r="0.8" fill="currentColor" />
      <circle cx="16" cy="12.5" r="0.8" fill="currentColor" />
      <circle cx="8" cy="16" r="0.8" fill="currentColor" />
      <circle cx="12" cy="16" r="0.8" fill="currentColor" />
      <circle cx="16" cy="16" r="0.8" fill="currentColor" />
    </svg>
  )
}