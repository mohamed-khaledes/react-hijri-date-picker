import * as react_jsx_runtime from 'react/jsx-runtime';

interface HijriDatePickerProps {
    className?: string;
    containerClassName?: string;
    inputClassName?: string;
    value?: string;
    onChange?: (v: string) => void;
    format?: 'YYYY-MM-DD' | 'D MMMM YYYY';
    placeholder?: string;
    locale?: 'en' | 'ar';
    optionsStartYear?: number;
    optionsEndYear?: number;
}
declare function HijriDatePicker({ value, onChange, format, placeholder, locale, optionsStartYear, optionsEndYear, className, containerClassName, inputClassName }: HijriDatePickerProps): react_jsx_runtime.JSX.Element;
declare function SimpleCalendarIcon({ className, title }: {
    className?: string;
    title?: string;
}): react_jsx_runtime.JSX.Element;

export { type HijriDatePickerProps, SimpleCalendarIcon, HijriDatePicker as default };
