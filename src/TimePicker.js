import React, { useState } from 'react';
import { ClockIcon } from '@heroicons/react/solid';

function TimePicker({ label, value, onChange }) {
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
            className="w-full text-gray-800 appearance-none   focus:outline-none bg-transparent"
          />
          <ClockIcon className="w-5 h-5 text-gray-500 ml-2" />
        </div>
      </div>
    );
  }
  
  export default TimePicker;