import React, { useState } from 'react';
import { ClockIcon } from '@heroicons/react/solid';

function TimePicker({ label, value, onChange, disabled=false }) {
    const [time, setTime] = useState(value);
  
    const handleTimeChange = (e) => {
      const newTime = e.target.value;
      setTime(newTime);
      onChange(newTime);
    };
  
    return (
      <div className="flex flex-col w-full rounded-sm my-2">
         <label htmlFor={label} className="mr-4 font-light">
        {label}:
      </label>
        <div className="flex items-center  rounded-md px-3 py-4 border">
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={handleTimeChange}
            disabled={disabled}
            className={disabled?'w-full text-gray-500 appearance-none   focus:outline-none bg-transparent':'w-full text-gray-800 appearance-none   focus:outline-none bg-transparent'}
            style={disabled ? { pointerEvents: 'none' } : null}
          />
        
        </div>
      </div>
    );
  }
  
  export default TimePicker;