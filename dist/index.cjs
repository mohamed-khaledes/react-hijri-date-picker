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
  SimpleCalendarIcon: () => SimpleCalendarIcon,
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
  optionsStartYear = 1400,
  optionsEndYear = 1500,
  className,
  containerClassName,
  inputClassName
}) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const [selected, setSelected] = (0, import_react.useState)(null);
  const [display, setDisplay] = (0, import_react.useState)({ hy: 1446, hm: 1 });
  const ref = (0, import_react.useRef)(null);
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
    const [y, m, d] = value2.split("-").map(Number);
    return { hy: y, hm: m, hd: d };
  }
  function formatHijriDate({ hy, hm, hd }, format2) {
    if (format2 === "YYYY-MM-DD") {
      return `${hy}-${String(hm).padStart(2, "0")}-${String(hd).padStart(2, "0")}`;
    } else if (format2 === "D MMMM YYYY") {
      return `${hd} ${MONTHS[hm - 1]} ${hy}`;
    }
    return `${hy}-${hm}-${hd}`;
  }
  (0, import_react.useEffect)(() => {
    if (value) {
      const parsed = parseHijriString(value);
      setSelected(parsed);
      setDisplay({ hy: parsed.hy, hm: parsed.hm });
    }
  }, [value]);
  (0, import_react.useEffect)(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const handleSelect = (day) => {
    const newDate = { hy: display.hy, hm: display.hm, hd: day };
    setSelected(newDate);
    onChange == null ? void 0 : onChange(formatHijriDate(newDate, format));
    setOpen(false);
  };
  const handlePrev = () => {
    setDisplay((prev) => prev.hm === 1 ? { hy: prev.hy - 1, hm: 12 } : { ...prev, hm: prev.hm - 1 });
  };
  const handleNext = () => {
    setDisplay((prev) => prev.hm === 12 ? { hy: prev.hy + 1, hm: 1 } : { ...prev, hm: prev.hm + 1 });
  };
  const handleClear = () => {
    setSelected(null);
    onChange == null ? void 0 : onChange("");
  };
  const MONTHS = locale === "ar" ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN;
  const WEEKDAYS = locale === "ar" ? WEEKDAYS_AR : WEEKDAYS_EN;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `hijri-picker ${className}`, ref, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `hijri-input-container ${containerClassName}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          value: selected ? formatHijriDate(selected, format) : "",
          placeholder,
          onClick: () => setOpen(!open),
          className: `hijri-input ${inputClassName}`,
          name: "hijri-date"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleCalendarIcon, { className: "calendar-icon" })
    ] }),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "calendar-popup", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "calendar-header", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: handlePrev, className: "nav-btn", children: "\u25C0" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "month-year", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "select",
            {
              value: display.hm,
              onChange: (e) => setDisplay({ ...display, hm: Number(e.target.value) }),
              className: "select",
              children: MONTHS.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: i + 1, children: m }, i))
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "select",
            {
              value: display.hy,
              onChange: (e) => setDisplay({ ...display, hy: Number(e.target.value) }),
              className: "select",
              children: Array.from(
                { length: optionsEndYear - optionsStartYear },
                (_, i) => optionsStartYear + i
              ).map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: y, children: y }, y))
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: handleNext, className: "nav-btn", children: "\u25B6" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "weekdays", children: WEEKDAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: d }, d)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "days-grid", children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          onClick: () => handleSelect(d),
          className: `day-btn ${(selected == null ? void 0 : selected.hd) === d && (selected == null ? void 0 : selected.hm) === display.hm && (selected == null ? void 0 : selected.hy) === display.hy ? "selected" : ""}`,
          children: d
        },
        d
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: handleClear, className: "clear-btn", children: "Clear" })
    ] })
  ] });
}
function SimpleCalendarIcon({
  className = "calendar-svg",
  title = "Calendar"
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      className,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      role: "img",
      "aria-label": title,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2.5", stroke: "currentColor", strokeWidth: "1.6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 9h18", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 3v3M16 3v3", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "8", cy: "12.5", r: "0.8", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12.5", r: "0.8", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "16", cy: "12.5", r: "0.8", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "8", cy: "16", r: "0.8", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "16", r: "0.8", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "16", cy: "16", r: "0.8", fill: "currentColor" })
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SimpleCalendarIcon
});
