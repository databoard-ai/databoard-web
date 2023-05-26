
import { useState, React } from 'react';
import { ChevronDownIcon } from "@heroicons/react/solid";

function Setup2() {
  

    const [selectedNoOfBranches, setSelectedNoOfBranches] = useState("1");
    const [isBranchesOpen, setIsBranchesOpen] = useState(false);
    const NoOfBranches = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
    ];
    const [selectedNoOfEmployees, setSelectedNoOfEmployees] = useState("1-10");
    const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);
    const NoEmployess = [
        "1-10",
        "11-20",
        "21-30",
        "31-40",
        "41-50",
        "Above 50",
    ];
    return (

        <div className="flex  justify-end h-screen bg-databoard-blue ">
            <div className="bg-left bg-no-repeat bg-contain w-full flex-nowrap h-full absolute z-0 bg-setup  justify-end flex flex-row  items-center pt-100">
                <div className='hidden md:block basis-1/2'>

                </div>
                <div className='container mx-auto  sm:w-full md:lg:w-1/2 lg:w-1/3 md:mr-15 lg:mr-30'>
                    <div className='h-full mx-auto justify-start bg-white rounded-sm px-10'>
                        <div className=" p-6   h-full py-40 px-30">

                            <h2 className="text-5xl mb-2 font-montserrat text-dark-text">Set up Databoard</h2>
                            <p className='py-5 font-extralight text-xl  text-dark-text'>Your frst time? Let’s help you set up your databoard</p>
                            <form>
                            <div className="mb-6">
                                    <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="org_type">Type of organization</label>
                                    <div className="relative inline-block text-left w-full ">
                                        <div className='w-full'>
                                            <button
                                                type="button"
                                                className="relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer bg-white text-gray-800 font-medium border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                onClick={() => setIsEmployeesOpen(!isEmployeesOpen)}
                                            >
                                                <span className="block truncate">{selectedNoOfEmployees}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                                </span>
                                            </button>
                                            {isEmployeesOpen && (
                                                <div className="absolute mt-1 w-64 rounded-md bg-white shadow-lg">
                                                    {NoEmployess.map((employee) => (
                                                        <button
                                                            key={employee}
                                                            onClick={() => {
                                                                setSelectedNoOfEmployees(employee);
                                                                setIsEmployeesOpen(false);
                                                            }}
                                                            className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                        >
                                                            {employee}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="org_type">Type of organization</label>
                                    <div className="relative inline-block text-left w-full ">
                                        <div className='w-full'>
                                            <button
                                                type="button"
                                                className="relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer bg-white text-gray-800 font-medium border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                onClick={() => setIsBranchesOpen(!isBranchesOpen)}
                                            >
                                                <span className="block truncate">{selectedNoOfBranches}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                                </span>
                                            </button>
                                            {isBranchesOpen && (
                                                <div className="absolute mt-1 w-64 rounded-md bg-white shadow-lg">
                                                    {NoOfBranches.map((branch) => (
                                                        <button
                                                            key={branch}
                                                            onClick={() => {
                                                                setSelectedNoOfBranches(branch);
                                                                setIsBranchesOpen(false);
                                                            }}
                                                            className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                        >
                                                            {branch}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
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

export default Setup2;