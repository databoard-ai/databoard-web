import React, { useState } from 'react';

function DatePicker({ label, value, onChange, disabled=false }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleDateChange = (e) => {
      onChange(e.target.value);
    };

  return (
    <div className="flex flex-col w-full rounded-sm my-2">
      <label htmlFor={label} className="text-sm font-medium text-dark-text">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="date"
          id={label}
          name={label}
          value={value}
          onChange={handleDateChange}
          disabled={disabled}
          className={`${
            isFocused ? 'focus:ring-indigo-500 focus:border-indigo-500' : ''
          } block w-full pr-2 border border-gray-300 rounded-md py-4 px-2`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}

export default DatePicker;