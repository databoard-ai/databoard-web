
import { useState, React } from 'react';
import { ChevronDownIcon } from "@heroicons/react/solid";

function Setup1() {
    const [rememberMe, setRememberMe] = useState(false);

    function handleRememberMeToggle() {
        setRememberMe(!rememberMe);
    }

    const [selectedOption, setSelectedOption] = useState("Hotel");
    const [isOpen, setIsOpen] = useState(false);
    const options = [
        "Hotel",
        "ICT",
        "Food",
        "Supply Chain",
        "Software",
        "Tourism",
    ];
    return (

        <div className="flex  justify-end h-screen bg-databoard-blue ">
            <div className="bg-left bg-no-repeat bg-contain w-full flex-nowrap h-full absolute z-0 bg-setup  justify-end flex flex-row  items-center pt-100">
                <div className='hidden md:block basis-1/2'>

                </div>
                <div className='container mx-auto  sm:w-full md:lg:w-1/2 lg:w-1/3 md:mr-15 lg:mr-30'>
                    <div className='h-full mx-auto justify-start bg-white rounded-sm px-5'>
                        <div className=" p-6 h-full py-40">

                            <h2 className="text-5xl mb-2 font-montserrat text-dark-text">Set up Databoard</h2>
                            <p className='py-5 font-extralight text-xl  text-dark-text'>Your frst time? Let’s help you set up your databoard</p>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="org_name">Name of organization</label>
                                    <input className="appearance-none border h-18 w-full py-4 px-3 text- leading-tight focus:outline-none focus:shadow-outline rounded-md" id="org_name" type="text" placeholder="Name of organization" />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="org_type">Type of organization</label>
                                    <div className="relative inline-block text-left w-full ">
                                        <div className='w-full'>
                                            <button
                                                type="button"
                                                className="relative w-full rounded-md shadow-sm pl-3 pr-10 py-4 text-left cursor-pointer bg-white text-gray-800 font-medium border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                onClick={() => setIsOpen(!isOpen)}
                                            >
                                                <span className="block truncate">{selectedOption}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <div className="absolute mt-1 w-64 rounded-md bg-white shadow-lg">
                                                    {options.map((option) => (
                                                        <button
                                                            key={option}
                                                            onClick={() => {
                                                                setSelectedOption(option);
                                                                setIsOpen(false);
                                                            }}
                                                            className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                        >
                                                            {option}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="location">Location</label>
                                    <input className="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Location" />
                                </div>


                                <button className="bg-databoard-blue w-full hover:bg-blue-700 text-white h-15 font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Continue
                                </button>

                            </form>


                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
}

export default Setup1;