// import { BsClock, BsCalendar } from "react-icons/bs";
import { useState, React } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import DatePicker from './DatePicker.js';
import TimePicker from "./TimePicker.js";
import axios from "axios";

function CreateTag() {

    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:00");
    const [email, setEmail] = useState("");
    const [tagName, setTagName] = useState("");
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

    const handleStartDateChange = (value) => {
        setStartDate(value);
    };

    const handleEndDateChange = (value) => {
        setEndDate(value);


    };

    const handleStartTimeChange = (newTime) => {
        setStartTime(newTime);
    };

    const handleEndTimeChange = (newTime) => {
        setEndTime(newTime);
    };

    const [infiniteTag, setInfiniteTag] = useState(false);

    function handleInfiniteTagToggle() {
        setInfiniteTag(!infiniteTag);
    }

    const createTag = async (e) => {
        e.preventDefault();

        if (email.strip() !== '' && tagName.strip() !== '' && startDate.strip() !== '' && startTime.strip() !== '') {
            try {
                const response = await axios.post('https://databoard-1-p3241077.deta.app/tags/create', {
                    email: email,
                    tag_name: tagName,
                    start_date: startDate,
                    tag_type: infiniteTag ? "infinite" : "finite",
                    start_time: startTime,
                    end_date: endDate,
                    end_time: endTime

                });
                // Handle response from API
                if (response.status === 200) {
                    // Login successful
                    console.log('Registration successful!');
                } else {
                    // Login failed
                    console.error('Registration failed.');
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        } else {
            console.error('Registration failed.');
        }
    }

    return (

        <div className="flex  justify-end h-screen bg-databoard-blue ">
            <div className="bg-center bg-no-repeat bg-contain w-full flex-nowrap h-full absolute z-0 bg-signin  justify-end flex flex-row  items-center pt-100">
                <div className='hidden md:block basis-1/2'>

                </div>
                <div className='container mx-auto w-auto md:lg:w-1/2 lg:w-1/4'>
                    <div className='h-full mx-auto bg-white rounded-sm px-10'>
                        <div className="    h-full py-24 px-30">

                            <h2 className="text-5xl mb-2 font-montserrat text-dark-text">Create an event tag</h2>
                            <p className='py-5 font-extralight text-xl  text-dark-text'>Create a tag for your event to help you acess data of your attendees</p>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="tag_name">Name</label>
                                    <input className="appearance-none border h-18 w-full py-4 px-3 text- leading-tight focus:outline-none focus:shadow-outline rounded-md" id="tag_name" type="text" placeholder="Name of tag" value={tagName} onChange={(e) => setTagName(e.target.value)} />
                                </div>
                                <div className="flex items-center my-3">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4 databoard-blue"
                                            checked={infiniteTag}
                                            onChange={handleInfiniteTagToggle}
                                        />
                                        <span className="ml-2 text-gray-700 font-extralight">infinite tag</span>
                                        <span className='ml-4'>
                                            <BsInfoCircle />
                                        </span>
                                    </label>


                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <DatePicker label="Start Date" value={startDate} onChange={handleStartDateChange} />
                                    <TimePicker label="Start Time" value={startTime} onChange={handleStartTimeChange} />


                                </div>
                                <div className="grid grid-cols-2 gap-4 pb-4">

                                    <DatePicker label="End Date" value={endDate} onChange={handleEndDateChange} />
                                    <TimePicker label="End Time" value={endTime} onChange={handleEndTimeChange} />
                                </div>

                                <button className="bg-databoard-blue w-full hover:bg-blue-700 text-white h-15 font-light py-4 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={createTag}>
                                    Create new tag
                                </button>

                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTag;