import React, { useState, useEffect, useRef } from 'react'
import './styles.css'

const HIJRI_MONTHS_EN = [
  'Muharram',
  'Safar',
  "Rabi' al-awwal",
  "Rabi' al-thani",
  'Jumada al-awwal',
  'Jumada al-thani',
  'Rajab',
  "Sha'ban",
  'Ramadan',
  'Shawwal',
  "Dhu al-Qa'dah",
  'Dhu al-Hijjah'
]
const HIJRI_MONTHS_AR = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الآخر',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة'
]
const WEEKDAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const WEEKDAYS_AR = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س']

export default function HijriDatePicker({
  value,
  onChange,
  format = 'YYYY-MM-DD',
  placeholder = 'Select Hijri date',
  locale = 'en',
  optionsStartYear = 1400,
  optionsEndYear = 1500,
  className,
  containerClassName,
  inputClassName
}: {
  className?:string
  containerClassName?:string
  inputClassName?:string
  value?: string
  onChange?: (v: string) => void
  format?: 'YYYY-MM-DD' | 'D MMMM YYYY'
  placeholder?: string
  locale?: 'en' | 'ar'
  optionsStartYear?: number
  optionsEndYear?: number
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<{ hy: number; hm: number; hd: number } | null>(null)
  const [display, setDisplay] = useState<{ hy: number; hm: number }>({ hy: 1446, hm: 1 })
  const ref = useRef<HTMLDivElement>(null)

  function hijriToGregorian(hy: number, hm: number, hd: number) {
    const days = Math.floor((hy - 1) * 354.367 + (hm - 1) * 29.53 + (hd - 1))
    const gDate = new Date(622, 6, 16)
    gDate.setDate(gDate.getDate() + days)
    return gDate
  }

  function gregorianToHijri(date: Date) {
    const diffDays = Math.floor(
      (date.getTime() - new Date(622, 6, 16).getTime()) / (1000 * 60 * 60 * 24)
    )
    const hy = Math.floor(diffDays / 354.367) + 1
    const remDays = diffDays % 354.367
    const hm = Math.floor(remDays / 29.53) + 1
    const hd = Math.floor(remDays % 29.53) + 1
    return { hy, hm, hd }
  }

  function parseHijriString(value: string) {
    const [y, m, d] = value.split('-').map(Number)
    return { hy: y, hm: m, hd: d }
  }

  function formatHijriDate({ hy, hm, hd }: any, format: string) {
    if (format === 'YYYY-MM-DD') {
      return `${hy}-${String(hm).padStart(2, '0')}-${String(hd).padStart(2, '0')}`
    } else if (format === 'D MMMM YYYY') {
      return `${hd} ${MONTHS[hm - 1]} ${hy}`
    }
    return `${hy}-${hm}-${hd}`
  }

  useEffect(() => {
    if (value) {
      const parsed = parseHijriString(value)
      setSelected(parsed)
      setDisplay({ hy: parsed.hy, hm: parsed.hm })
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const days = Array.from({ length: 30 }, (_, i) => i + 1)

  const handleSelect = (day: number) => {
    const newDate = { hy: display.hy, hm: display.hm, hd: day }
    setSelected(newDate)
    onChange?.(formatHijriDate(newDate, format))
    setOpen(false)
  }

  const handlePrev = () => {
    setDisplay(prev => (prev.hm === 1 ? { hy: prev.hy - 1, hm: 12 } : { ...prev, hm: prev.hm - 1 }))
  }

  const handleNext = () => {
    setDisplay(prev => (prev.hm === 12 ? { hy: prev.hy + 1, hm: 1 } : { ...prev, hm: prev.hm + 1 }))
  }

  const handleClear = () => {
    setSelected(null)
    onChange?.('')
  }

  const MONTHS = locale === 'ar' ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN
  const WEEKDAYS = locale === 'ar' ? WEEKDAYS_AR : WEEKDAYS_EN

  return (
    <div className={`hijri-picker ${className}`} ref={ref}>
      <div className={`hijri-input-container ${containerClassName}`}>
        <input
          value={selected ? formatHijriDate(selected, format) : ''}
          placeholder={placeholder}
          onClick={() => setOpen(!open)}
          className={`hijri-input ${inputClassName}`}
          name='hijri-date'
        />
        <SimpleCalendarIcon className='calendar-icon' />
      </div>

      {open && (
        <div className='calendar-popup'>
          <div className='calendar-header'>
            <button type='button' onClick={handlePrev} className='nav-btn'>
              ◀
            </button>
            <div className='month-year'>
              <select
                value={display.hm}
                onChange={e => setDisplay({ ...display, hm: Number(e.target.value) })}
                className='select'
              >
                {MONTHS.map((m, i) => (
                  <option key={i} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={display.hy}
                onChange={e => setDisplay({ ...display, hy: Number(e.target.value) })}
                className='select'
              >
                {Array.from(
                  { length: optionsEndYear - optionsStartYear },
                  (_, i) => optionsStartYear + i
                ).map(y => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <button type='button' onClick={handleNext} className='nav-btn'>
              ▶
            </button>
          </div>

          <div className='weekdays'>
            {WEEKDAYS.map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className='days-grid'>
            {days.map(d => (
              <button
                key={d}
                type='button'
                onClick={() => handleSelect(d)}
                className={`day-btn ${
                  selected?.hd === d && selected?.hm === display.hm && selected?.hy === display.hy
                    ? 'selected'
                    : ''
                }`} 
              >
                {d}
              </button>
            ))}
          </div>

          <button type='button' onClick={handleClear} className='clear-btn'>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export function SimpleCalendarIcon({
  className = 'calendar-svg',
  title = 'Calendar'
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-label={title}
    >
      <rect x='3' y='4' width='18' height='17' rx='2.5' stroke='currentColor' strokeWidth='1.6' />
      <path d='M3 9h18' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
      <path d='M8 3v3M16 3v3' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
      <circle cx='8' cy='12.5' r='0.8' fill='currentColor' />
      <circle cx='12' cy='12.5' r='0.8' fill='currentColor' />
      <circle cx='16' cy='12.5' r='0.8' fill='currentColor' />
      <circle cx='8' cy='16' r='0.8' fill='currentColor' />
      <circle cx='12' cy='16' r='0.8' fill='currentColor' />
      <circle cx='16' cy='16' r='0.8' fill='currentColor' />
    </svg>
  )
}
