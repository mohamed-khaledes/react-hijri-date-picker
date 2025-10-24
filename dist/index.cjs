var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => HijriDatePicker
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var HIJRI_MONTHS_EN = [
  "Muharram",
  "Safar",
  "Rabi' al-awwal",
  "Rabi' al-thani",
  "Jumada al-awwal",
  "Jumada al-thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qa'dah",
  "Dhu al-Hijjah"
];
var HIJRI_MONTHS_AR = [
  "\u0645\u062D\u0631\u0645",
  "\u0635\u0641\u0631",
  "\u0631\u0628\u064A\u0639 \u0627\u0644\u0623\u0648\u0644",
  "\u0631\u0628\u064A\u0639 \u0627\u0644\u0622\u062E\u0631",
  "\u062C\u0645\u0627\u062F\u0649 \u0627\u0644\u0623\u0648\u0644\u0649",
  "\u062C\u0645\u0627\u062F\u0649 \u0627\u0644\u0622\u062E\u0631\u0629",
  "\u0631\u062C\u0628",
  "\u0634\u0639\u0628\u0627\u0646",
  "\u0631\u0645\u0636\u0627\u0646",
  "\u0634\u0648\u0627\u0644",
  "\u0630\u0648 \u0627\u0644\u0642\u0639\u062F\u0629",
  "\u0630\u0648 \u0627\u0644\u062D\u062C\u0629"
];
var WEEKDAYS_EN = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
var WEEKDAYS_AR = ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"];
function HijriDatePicker({
  value,
  onChange,
  format = "YYYY-MM-DD",
  placeholder = "Select Hijri date",
  locale = "en",
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
  popupPosition = "auto",
  className = "",
  containerClassName = "",
  inputClassName = "",
  popupClassName = "",
  theme = "light",
  customColors = {}
}) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const [selected, setSelected] = (0, import_react.useState)(null);
  const [display, setDisplay] = (0, import_react.useState)({ hy: 1446, hm: 1 });
  const [inputValue, setInputValue] = (0, import_react.useState)("");
  const ref = (0, import_react.useRef)(null);
  const inputRef = (0, import_react.useRef)(null);
  const colors = {
    primary: customColors.primary || (theme === "dark" ? "#60a5fa" : "#3b82f6"),
    background: customColors.background || (theme === "dark" ? "#1f2937" : "#ffffff"),
    text: customColors.text || (theme === "dark" ? "#f3f4f6" : "#111827"),
    border: customColors.border || (theme === "dark" ? "#374151" : "#d1d5db"),
    hover: customColors.hover || (theme === "dark" ? "#374151" : "#f3f4f6"),
    selected: customColors.selected || (theme === "dark" ? "#2563eb" : "#3b82f6"),
    disabled: customColors.disabled || (theme === "dark" ? "#4b5563" : "#9ca3af")
  };
  function hijriToGregorian(hy, hm, hd) {
    const days2 = Math.floor((hy - 1) * 354.367 + (hm - 1) * 29.53 + (hd - 1));
    const gDate = new Date(622, 6, 16);
    gDate.setDate(gDate.getDate() + days2);
    return gDate;
  }
  function gregorianToHijri(date) {
    const diffDays = Math.floor(
      (date.getTime() - new Date(622, 6, 16).getTime()) / (1e3 * 60 * 60 * 24)
    );
    const hy = Math.floor(diffDays / 354.367) + 1;
    const remDays = diffDays % 354.367;
    const hm = Math.floor(remDays / 29.53) + 1;
    const hd = Math.floor(remDays % 29.53) + 1;
    return { hy, hm, hd };
  }
  function parseHijriString(value2) {
    const formats = [
      /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
      /^(\d{1,2})-(\d{1,2})-(\d{4})$/
    ];
    for (const regex of formats) {
      const match = value2.match(regex);
      if (match) {
        const [, a, b, c] = match;
        if (regex.source.startsWith("^(\\d{4})")) {
          return { hy: Number(a), hm: Number(b), hd: Number(c) };
        } else {
          return { hy: Number(c), hm: Number(b), hd: Number(a) };
        }
      }
    }
    return null;
  }
  function formatHijriDate(date, fmt) {
    const MONTHS2 = locale === "ar" ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN;
    switch (fmt) {
      case "YYYY-MM-DD":
        return `${date.hy}-${String(date.hm).padStart(2, "0")}-${String(date.hd).padStart(2, "0")}`;
      case "D MMMM YYYY":
        return `${date.hd} ${MONTHS2[date.hm - 1]} ${date.hy}`;
      case "DD/MM/YYYY":
        return `${String(date.hd).padStart(2, "0")}/${String(date.hm).padStart(2, "0")}/${date.hy}`;
      case "MM/DD/YYYY":
        return `${String(date.hm).padStart(2, "0")}/${String(date.hd).padStart(2, "0")}/${date.hy}`;
      default:
        return `${date.hy}-${date.hm}-${date.hd}`;
    }
  }
  function isDateDisabled(date) {
    const dateStr = formatHijriDate(date, "YYYY-MM-DD");
    if (disabledDates.includes(dateStr)) return true;
    if (minDate) {
      const min = parseHijriString(minDate);
      if (min && compareHijriDates(date, min) < 0) return true;
    }
    if (maxDate) {
      const max = parseHijriString(maxDate);
      if (max && compareHijriDates(date, max) > 0) return true;
    }
    return false;
  }
  function compareHijriDates(a, b) {
    if (a.hy !== b.hy) return a.hy - b.hy;
    if (a.hm !== b.hm) return a.hm - b.hm;
    return a.hd - b.hd;
  }
  function isDateHighlighted(date) {
    const dateStr = formatHijriDate(date, "YYYY-MM-DD");
    return highlightedDates.includes(dateStr);
  }
  (0, import_react.useEffect)(() => {
    if (value) {
      const parsed = parseHijriString(value);
      if (parsed) {
        setSelected(parsed);
        setDisplay({ hy: parsed.hy, hm: parsed.hm });
        setInputValue(formatHijriDate(parsed, format));
      }
    } else {
      setInputValue("");
    }
  }, [value, format]);
  (0, import_react.useEffect)(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        if (open) {
          setOpen(false);
          onClose == null ? void 0 : onClose();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);
  const getDaysInMonth = () => Array.from({ length: 30 }, (_, i) => i + 1);
  const getFirstDayOffset = () => {
    const firstDay = hijriToGregorian(display.hy, display.hm, 1);
    let offset = firstDay.getDay() - firstDayOfWeek;
    if (offset < 0) offset += 7;
    return offset;
  };
  const handleSelect = (day) => {
    const newDate = { hy: display.hy, hm: display.hm, hd: day };
    if (isDateDisabled(newDate)) return;
    setSelected(newDate);
    const formatted = formatHijriDate(newDate, format);
    setInputValue(formatted);
    const gregorian = hijriToGregorian(newDate.hy, newDate.hm, newDate.hd);
    onChange == null ? void 0 : onChange(formatted, gregorian);
    if (closeOnSelect) {
      setOpen(false);
      onClose == null ? void 0 : onClose();
    }
  };
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (allowManualInput) {
      const parsed = parseHijriString(val);
      if (parsed && !isDateDisabled(parsed)) {
        setSelected(parsed);
        setDisplay({ hy: parsed.hy, hm: parsed.hm });
        const gregorian = hijriToGregorian(parsed.hy, parsed.hm, parsed.hd);
        onChange == null ? void 0 : onChange(formatHijriDate(parsed, format), gregorian);
      }
    }
  };
  const handlePrev = () => {
    setDisplay((prev) => prev.hm === 1 ? { hy: prev.hy - 1, hm: 12 } : { ...prev, hm: prev.hm - 1 });
  };
  const handleNext = () => {
    setDisplay((prev) => prev.hm === 12 ? { hy: prev.hy + 1, hm: 1 } : { ...prev, hm: prev.hm + 1 });
  };
  const handleClear = () => {
    setSelected(null);
    setInputValue("");
    onChange == null ? void 0 : onChange("", void 0);
  };
  const handleToday = () => {
    const today = gregorianToHijri(/* @__PURE__ */ new Date());
    setSelected(today);
    setDisplay({ hy: today.hy, hm: today.hm });
    const formatted = formatHijriDate(today, format);
    setInputValue(formatted);
    const gregorian = /* @__PURE__ */ new Date();
    onChange == null ? void 0 : onChange(formatted, gregorian);
    if (closeOnSelect) {
      setOpen(false);
      onClose == null ? void 0 : onClose();
    }
  };
  const handleOpenToggle = () => {
    if (disabled || readOnly) return;
    const newOpen = !open;
    setOpen(newOpen);
    if (newOpen) {
      onOpen == null ? void 0 : onOpen();
    } else {
      onClose == null ? void 0 : onClose();
    }
  };
  const MONTHS = locale === "ar" ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN;
  const WEEKDAYS = locale === "ar" ? WEEKDAYS_AR : WEEKDAYS_EN;
  const days = getDaysInMonth();
  const firstDayOffset = getFirstDayOffset();
  const styles = {
    container: {
      position: "relative",
      width: "100%",
      maxWidth: "300px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    },
    inputContainer: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    },
    input: {
      width: "100%",
      padding: "8px 36px 8px 12px",
      fontSize: "14px",
      border: `1px solid ${colors.border}`,
      borderRadius: "6px",
      outline: "none",
      background: colors.background,
      color: colors.text,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1
    },
    icon: {
      position: "absolute",
      right: "8px",
      width: "20px",
      height: "20px",
      color: colors.text,
      pointerEvents: "none"
    },
    popup: {
      position: "absolute",
      top: popupPosition === "top" ? "auto" : "100%",
      bottom: popupPosition === "top" ? "100%" : "auto",
      left: 0,
      marginTop: popupPosition === "top" ? 0 : "4px",
      marginBottom: popupPosition === "top" ? "4px" : 0,
      background: colors.background,
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      padding: "12px",
      zIndex: 1e3,
      minWidth: "280px"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
      gap: "8px"
    },
    navBtn: {
      background: "none",
      border: "none",
      padding: "4px 8px",
      cursor: "pointer",
      fontSize: "16px",
      color: colors.text,
      borderRadius: "4px",
      transition: "background 0.2s"
    },
    monthYear: {
      display: "flex",
      gap: "8px",
      flex: 1
    },
    select: {
      padding: "4px 8px",
      fontSize: "13px",
      border: `1px solid ${colors.border}`,
      borderRadius: "4px",
      background: colors.background,
      color: colors.text,
      cursor: "pointer",
      flex: 1
    },
    weekdays: {
      display: "grid",
      gridTemplateColumns: showWeekNumbers ? "auto repeat(7, 1fr)" : "repeat(7, 1fr)",
      gap: "4px",
      marginBottom: "8px",
      fontSize: "12px",
      fontWeight: 600,
      color: colors.text,
      textAlign: "center"
    },
    daysGrid: {
      display: "grid",
      gridTemplateColumns: showWeekNumbers ? "auto repeat(7, 1fr)" : "repeat(7, 1fr)",
      gap: "4px",
      marginBottom: "8px"
    },
    dayBtn: {
      padding: "8px",
      fontSize: "13px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      background: "none",
      color: colors.text,
      transition: "all 0.2s",
      fontWeight: 500
    },
    footer: {
      display: "flex",
      gap: "8px",
      marginTop: "8px"
    },
    btn: {
      padding: "6px 12px",
      fontSize: "13px",
      border: `1px solid ${colors.border}`,
      borderRadius: "4px",
      cursor: "pointer",
      background: colors.background,
      color: colors.text,
      transition: "all 0.2s",
      flex: 1
    },
    gregorian: {
      fontSize: "11px",
      color: colors.disabled,
      textAlign: "center",
      marginTop: "8px",
      padding: "4px"
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.container }, className, ref, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.inputContainer, className: containerClassName, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          ref: inputRef,
          value: inputValue,
          placeholder,
          onClick: handleOpenToggle,
          onChange: handleInputChange,
          readOnly: !allowManualInput,
          disabled,
          style: styles.input,
          className: inputClassName,
          name: "hijri-date"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarIcon, { style: styles.icon })
    ] }),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.popup, className: popupClassName, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.header, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: handlePrev,
            style: styles.navBtn,
            onMouseEnter: (e) => e.currentTarget.style.background = colors.hover,
            onMouseLeave: (e) => e.currentTarget.style.background = "none",
            children: locale === "ar" ? "\u25B6" : "\u25C0"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.monthYear, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "select",
            {
              value: display.hm,
              onChange: (e) => setDisplay({ ...display, hm: Number(e.target.value) }),
              style: styles.select,
              children: MONTHS.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: i + 1, children: m }, i))
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "select",
            {
              value: display.hy,
              onChange: (e) => setDisplay({ ...display, hy: Number(e.target.value) }),
              style: styles.select,
              children: Array.from(
                { length: optionsEndYear - optionsStartYear },
                (_, i) => optionsStartYear + i
              ).map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: y, children: y }, y))
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: handleNext,
            style: styles.navBtn,
            onMouseEnter: (e) => e.currentTarget.style.background = colors.hover,
            onMouseLeave: (e) => e.currentTarget.style.background = "none",
            children: locale === "ar" ? "\u25C0" : "\u25B6"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.weekdays, children: [
        showWeekNumbers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
        WEEKDAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: d }, d))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.daysGrid, children: [
        Array.from({ length: firstDayOffset }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, `empty-${i}`)),
        days.map((d) => {
          const date = { hy: display.hy, hm: display.hm, hd: d };
          const isSelected = (selected == null ? void 0 : selected.hd) === d && (selected == null ? void 0 : selected.hm) === display.hm && (selected == null ? void 0 : selected.hy) === display.hy;
          const isDisabled = isDateDisabled(date);
          const isHighlighted = isDateHighlighted(date);
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              onClick: () => handleSelect(d),
              disabled: isDisabled,
              style: {
                ...styles.dayBtn,
                background: isSelected ? colors.selected : isHighlighted ? colors.hover : "none",
                color: isSelected ? "#fff" : isDisabled ? colors.disabled : colors.text,
                cursor: isDisabled ? "not-allowed" : "pointer",
                border: isHighlighted && !isSelected ? `1px solid ${colors.primary}` : "none",
                opacity: isDisabled ? 0.4 : 1
              },
              onMouseEnter: (e) => {
                if (!isSelected && !isDisabled) {
                  e.currentTarget.style.background = colors.hover;
                }
              },
              onMouseLeave: (e) => {
                if (!isSelected && !isDisabled) {
                  e.currentTarget.style.background = isHighlighted ? colors.hover : "none";
                }
              },
              children: customDayRenderer ? customDayRenderer(d, date) : d
            },
            d
          );
        })
      ] }),
      showGregorianEquivalent && selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.gregorian, children: [
        locale === "ar" ? "\u0645\u064A\u0644\u0627\u062F\u0649" : "Gregorian",
        ": ",
        hijriToGregorian(selected.hy, selected.hm, selected.hd).toLocaleDateString()
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.footer, children: [
        showTodayButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: handleToday,
            style: styles.btn,
            onMouseEnter: (e) => e.currentTarget.style.background = colors.hover,
            onMouseLeave: (e) => e.currentTarget.style.background = colors.background,
            children: locale === "ar" ? "\u0627\u0644\u064A\u0648\u0645" : "Today"
          }
        ),
        clearable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: handleClear,
            style: styles.btn,
            onMouseEnter: (e) => e.currentTarget.style.background = colors.hover,
            onMouseLeave: (e) => e.currentTarget.style.background = colors.background,
            children: locale === "ar" ? "\u0645\u0633\u062D" : "Clear"
          }
        )
      ] })
    ] })
  ] });
}
function CalendarIcon({ style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { style, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2.5", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 9h18", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 3v3M16 3v3", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "8", cy: "12.5", r: "0.8", fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12.5", r: "0.8", fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "16", cy: "12.5", r: "0.8", fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "8", cy: "16", r: "0.8", fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "16", r: "0.8", fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "16", cy: "16", r: "0.8", fill: "currentColor" })
  ] });
}
