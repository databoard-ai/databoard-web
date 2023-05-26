import React, { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/solid';

function DatePicker({ label, value, onChange }) {
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
          className={`${
            isFocused ? 'focus:ring-indigo-500 focus:border-indigo-500' : ''
          } block w-full pr-10 border border-gray-300 rounded-md py-4 px-2`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <CalendarIcon className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

export default DatePicker;