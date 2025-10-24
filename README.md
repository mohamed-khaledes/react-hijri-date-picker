# 🌙 React Hijri Date Picker

A **lightweight Hijri (Islamic) date picker** built with **pure React, HTML, and CSS** — no dependencies, no Tailwind, no icons.  
Easily convert and select dates in the **Hijri (Islamic)** calendar format while maintaining **Gregorian** accuracy.

[![npm version](https://img.shields.io/npm/v/react-hijri-date-picker.svg)](https://www.npmjs.com/package/@mk01/react-hijri-date-picker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-17%2B-blue.svg)](https://react.dev)

---
<img width="1076" height="667" alt="Screenshot_102" src="https://github.com/user-attachments/assets/d14b4ebf-d383-4190-952f-0205d2ee559d" />

## ✨ Features

✅ Pure React + CSS (no extra dependencies)  
✅ Supports **Hijri ⇄ Gregorian** conversion  
✅ **English** and **Arabic** locales  
✅ Configurable year range and placeholders  
✅ Click-to-open dropdown calendar  
✅ Fully typed with TypeScript support  

---

## 📦 Installation

Install via npm or yarn:

```bash
 npm install @mk01/react-hijri-date-picker
 or
 yarn add @mk01/react-hijri-date-picker
```
```bash
import React, { useState } from 'react'
import HijriDatePicker from '@mk01/react-hijri-date-picker'
import '@mk01/react-hijri-date-picker/dist/index.css'

export default function App() {
  const [date, setDate] = useState('')

  return (
    <div>
      <h3>Hijri Date Picker Example</h3>
      <HijriDatePicker
        value={date}
        onChange={setDate}
        locale='en'
        placeholder='Select Hijri date'
      />
      <p>Selected Date: {date}</p>
    </div>
  )

}
