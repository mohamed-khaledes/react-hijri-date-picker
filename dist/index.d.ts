import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface HijriDatePickerProps {
    value?: string;
    onChange?: (value: string, gregorianDate?: Date) => void;
    format?: 'YYYY-MM-DD' | 'D MMMM YYYY' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
    placeholder?: string;
    locale?: 'en' | 'ar';
    disabled?: boolean;
    readOnly?: boolean;
    clearable?: boolean;
    showGregorianEquivalent?: boolean;
    minDate?: string;
    maxDate?: string;
    disabledDates?: string[];
    highlightedDates?: string[];
    optionsStartYear?: number;
    optionsEndYear?: number;
    firstDayOfWeek?: 0 | 1;
    showWeekNumbers?: boolean;
    allowManualInput?: boolean;
    closeOnSelect?: boolean;
    showTodayButton?: boolean;
    customDayRenderer?: (day: number, date: {
        hy: number;
        hm: number;
        hd: number;
    }) => React.ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
    popupPosition?: 'bottom' | 'top' | 'auto';
    className?: string;
    containerClassName?: string;
    inputClassName?: string;
    popupClassName?: string;
    theme?: 'light' | 'dark' | 'custom';
    customColors?: {
        primary?: string;
        background?: string;
        text?: string;
        border?: string;
        hover?: string;
        selected?: string;
        disabled?: string;
    };
}
declare function HijriDatePicker({ value, onChange, format, placeholder, locale, disabled, readOnly, clearable, showGregorianEquivalent, minDate, maxDate, disabledDates, highlightedDates, optionsStartYear, optionsEndYear, firstDayOfWeek, showWeekNumbers, allowManualInput, closeOnSelect, showTodayButton, customDayRenderer, onOpen, onClose, popupPosition, className, containerClassName, inputClassName, popupClassName, theme, customColors }: HijriDatePickerProps): react_jsx_runtime.JSX.Element;

export { type HijriDatePickerProps, HijriDatePicker as default };
