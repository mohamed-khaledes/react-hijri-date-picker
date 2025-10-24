# 🌙 React Hijri Date Picker

A **lightweight Hijri (Islamic) date picker** built with **pure React, HTML, and CSS** — no dependencies, no Tailwind, no icons.  
Easily convert and select dates in the **Hijri (Islamic)** calendar format while maintaining **Gregorian** accuracy.

[![npm version](https://img.shields.io/npm/v/@mk01/react-hijri-date-picker.svg)](https://www.npmjs.com/package/@mk01/react-hijri-date-picker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-17%2B-blue.svg)](https://react.dev)

---
<img width="1076" height="667" alt="Screenshot_102" src="https://github.com/user-attachments/assets/d14b4ebf-d383-4190-952f-0205d2ee559d" />

## ✨ Features

✅ Pure React + CSS (no extra dependencies)

✅ Supports Hijri ⇄ Gregorian conversion

✅ English and Arabic locales

✅ Configurable year range and placeholders

✅ Click-to-open dropdown calendar

✅ Fully typed with TypeScript support

✅ Multiple date formats (YYYY-MM-DD, D MMMM YYYY, DD/MM/YYYY, MM/DD/YYYY)

✅ Min/max date restrictions

✅ Disabled and highlighted dates

✅ Optional manual input with format validation

✅ Gregorian equivalent display

✅ Clearable and Today button options

✅ Custom day renderer support

✅ Callbacks for open/close events

✅ Popup position control (top/bottom/auto)

✅ Full keyboard accessibility

✅ Returns both Hijri string and Gregorian Date object

✅ Light / Dark / Custom themes with customizable colors

---

## 📦 Installation

Install via npm or yarn:

```bash
 npm install @mk01/react-hijri-date-picker
 or
 yarn add @mk01/react-hijri-date-picker
```
## #Basic usage
```bash
import React, { useState } from 'react'
import HijriDatePicker , { type HijriDatePickerProps } from '@mk01/react-hijri-date-picker'

export default function App() {
 const [date1, setDate1] = useState('1446-04-15')

  return (
     <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>Basic Usage</h3>
          <HijriDatePicker
            value={date1}
            onChange={(v) => setDate1(v)}
            placeholder="Select date"
          />
          <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
            Selected: {date1 || 'None'}
          </p>
        </div>
  )

}

```
## #Arabic Locale with Gregorian Display
```bash
import React, { useState } from 'react'
import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function App() {
 const [date2, setDate2] = useState('1446-04-15')

  return (
     <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>Arabic Locale with Gregorian Display</h3>
          <HijriDatePicker
            value={date2}
            onChange={(v, g) => {
              setDate2(v)
              console.log('Hijri:', v, 'Gregorian:', g)
            }}
            locale="ar"
            format="D MMMM YYYY"
            showGregorianEquivalent
            placeholder="اختر التاريخ"
          />
        </div>
  )
}

```
## #Dark Theme with Custom Colors
```bash
import React, { useState } from 'react'
import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function App() {
 const [date3, setDate3] = useState('1446-04-15')

  return (
      <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>Dark Theme with Custom Colors</h3>
          <HijriDatePicker
            value={date3}
            onChange={setDate3}
            theme="dark"
            customColors={{
              primary: '#10b981',
              selected: '#059669'
            }}
            highlightedDates={['1446-04-10', '1446-04-20']}
            placeholder="Select date"
          />
        </div>
  )
}

```
## #With Restrictions
```bash
import React from 'react'
import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function App() {
  return (
      <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>With Restrictions</h3>
          <HijriDatePicker
            onChange={(v) => console.log(v)}
            minDate="1446-04-01"
            maxDate="1446-04-30"
            disabledDates={['1446-04-15', '1446-04-16']}
            placeholder="Only Rabi' al-thani 1446"
          />
        </div>
  )
}

```
## #Manual Input Enabled
```bash
import React from 'react'
import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function App() {
  return (
       <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>Manual Input Enabled</h3>
          <HijriDatePicker
            onChange={(v) => console.log(v)}
            allowManualInput
            format="DD/MM/YYYY"
            placeholder="Type or select: DD/MM/YYYY"
          />
        </div>
  )
}

```
## #Disabled State
```bash
import React from 'react'
import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function App() {
  return (
      <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>Disabled State</h3>
          <HijriDatePicker
            value="1446-04-25"
            disabled
            placeholder="Disabled picker"
          />
        </div>
  )
}
