
import { useState, React } from 'react';
import { ChevronDownIcon } from "@heroicons/react/solid";
import axios from 'axios';
import { Box,useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const [rememberMe, setRememberMe] = useState(false);
    const toast = useToast()

    const navigate = useNavigate();



    const [orgType, setOrgType] = useState("Hotel");
    const [orgTypeIsOpen, setOrgTypeIsOpen] = useState(false);
    const orgTypes = [
        "Hotel",
        "ICT",
        "Food",
        "Supply Chain",
        "Software",
        "Tourism",
    ];
    const [orgName, setOrgName] = useState("");
    const [orgLocation, setOrgLocation] = useState("");
    const [noOfBranches, setSelectedNoOfBranches] = useState("1");
    const [isBranchesOpen, setIsBranchesOpen] = useState(false);
    const branchesOptions = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
    ];
    const [noOfEmployees, setSelectedNoOfEmployees] = useState("1-10");
    const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);
    const noOfEmployeesOptions = [
        "1-10",
        "11-20",
        "21-30",
        "31-40",
        "41-50",
        "Above 50",
    ];

    const [orgEmail, setOrgEmail] = useState("");
    const [orgPhone, setOrgPhone] = useState("");
    const [orgPassword, setOrgPassword] = useState("");
    const [orgLink, setOrgLink] = useState("");
    const [step, setStep] = useState(1);

    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the fields in the current step
        if (step === 1 && (orgName.trim() === '' || orgLocation.trim() === '' || orgType.trim() === '')) {
            console.error('Please all fields are required');
            return;
        }

        if (step === 2 && (noOfEmployees.trim() === '' || noOfBranches.trim() === '' || orgType.trim() === '')) {
            console.error('Please all fields are required');
            return;
        }

        if (step === 3 && (orgEmail.trim() === '' || orgPhone.trim() === '' || orgLink.trim() === '' || orgPassword.trim() === '')) {
            console.error('Please all fields are quired');
            return;
        }

        if (step === 3) {
            // All steps completed, send registration request to API
            setIsLoading(true)
            try {
                axios({
                    method: 'post',
                    url: 'https://databoard-service.onrender.com/register', data: {
                        org_name: orgName,
                        org_type: orgType,
                        org_location: orgLocation,
                        no_employees: noOfEmployees,
                        no_branches: noOfBranches,
                        email: orgEmail,
                        org_phone: orgPhone,
                        org_link: orgLink,
                        org_password: orgPassword,
                        image: "",
                        verified: false

                    }
                }).then(function (response) {
                    // Handle response from API
                    // response=JSON.stringify(response.data)

                    const responseData = response.data;

                    const status = responseData.status_code;
                    if (status === 200) {
                        const message = responseData.message;
                        // Registration successful
                        toast({
                            position: 'top-right',
                            render: () => (
                                <Box color='white' p={3} bg='green.500' borderRadius="md">
                                    {message}
                                </Box>
                            ),
                        })
                        navigate('/login');
                    } else {
                        const message = responseData.detail && responseData.detail.message;
                        toast({
                            position: 'top-right',
                            render: () => (
                                <Box color='white' p={3} bg='red.500' borderRadius="md">
                                    {message}
                                </Box>
                            ),
                        })
                    }
                    setIsLoading(false)
                });


            } catch (error) {
                toast({
                    position: 'top-right',
                    render: () => (
                        <Box color='white' p={3} bg='red.500' borderRadius="md">
                            Something went wrong {error}
                        </Box>
                    ),
                })
            }
        }
        else {
            // Proceed to the next step
            setStep(step + 1);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className='h-full mx-auto justify-start bg-white rounded-sm px-5'>
                        <div className=" p-6 h-full py-40">

                            <h2 className="text-5xl mb-2 font-montserrat text-dark-text">Set up Databoard</h2>
                            <p className='py-5 font-extralight text-xl  text-dark-text'>Your frst time? Let’s help you set up your databoard</p>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="org_name">Name of organization</label>
                                    <input className="appearance-none border h-18 w-full py-4 px-3 text- leading-tight focus:outline-none focus:shadow-outline rounded-md" id="org_name" type="text" placeholder="Name of organization" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="org_type">Type of organization</label>
                                    <div className="relative inline-block text-left w-full ">
                                        <div className='w-full'>
                                            <button
                                                type="button"
                                                className="relative w-full rounded-md shadow-sm pl-3 pr-10 py-4 text-left cursor-pointer bg-white text-gray-800 font-medium border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                onClick={() => setOrgTypeIsOpen(!orgTypeIsOpen)}
                                            >
                                                <span className="block truncate">{orgType}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                                </span>
                                            </button>
                                            {orgTypeIsOpen && (
                                                <div className="absolute mt-1 w-64 rounded-md bg-white shadow-lg">
                                                    {orgTypes.map((option) => (
                                                        <button
                                                            key={option}
                                                            onClick={() => {
                                                                setOrgType(option);
                                                                setOrgTypeIsOpen(false);
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
                                    <input className="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Location" value={orgLocation} onChange={(e) => setOrgLocation(e.target.value)} />
                                </div>


                                <button className="bg-databoard-blue w-full hover:bg-blue-700 text-white h-15 font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                                    Continue
                                </button>

                            </form>


                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className='h-full mx-auto justify-start bg-white rounded-sm px-10'>
                        <div className=" p-6   h-full py-40 px-30">

                            <h2 className="text-5xl mb-2 font-montserrat text-dark-text">Set up Databoard</h2>
                            <p className='py-5 font-extralight text-xl  text-dark-text'>Your first time? Let’s help you set up your databoard</p>
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
                                                <span className="block truncate">{noOfEmployees}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                                </span>
                                            </button>
                                            {isEmployeesOpen && (
                                                <div className="absolute mt-1 w-64 rounded-md bg-white shadow-lg">
                                                    {noOfEmployeesOptions.map((employee) => (
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
                                                <span className="block truncate">{noOfBranches}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                                </span>
                                            </button>
                                            {isBranchesOpen && (
                                                <div className="absolute mt-1 w-64 rounded-md bg-white shadow-lg">
                                                    {branchesOptions.map((branch) => (
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
                                <button className="bg-databoard-blue w-full hover:bg-blue-700 text-white h-15 font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                                    Register
                                </button>

                            </form>


                        </div>
                    </div>);
            case 3:

                return (<div className='h-full mx-auto bg-white rounded-sm px-10'>
                    <div className=" p-6   h-full py-20 px-30">

                        <div className='flex justify-center'>
                            {/* <div className="relative">
                                <img
                                    className="w-55 h-55 rounded-full cursor-pointer"
                                    src={'https://via.placeholder.com/150'}
                                    alt="Avatar"
                                    onClick={() => document.getElementById('imageUpload').click()}
                                />
                                <input
                                    type="file"
                                    id="imageUpload"
                                    className="hidden"
                                onChange={handleImageUpload}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                      <BsCamera className="w-8 h-8 text-gray-500" />
                    </div>
                            </div> */}

                        </div>

                        <p className='py-5 font-extralight text-md  text-dark-text text-center'>Upload an image of your brand’s Identity</p>
                        <form>
                            <div className="mb-4">
                                <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="email">Organization Email</label>
                                <input className="appearance-none border h-18 w-full py-4 px-3 text- leading-tight focus:outline-none focus:shadow-outline rounded-md" id="email" type="email" placeholder="admin@abclightroom.com" value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="phone">Phone number</label>
                                <input className="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="08036322653" value={orgPhone} onChange={(e) => setOrgPhone(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="website">Website / social link</label>
                                <input className="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="website" type="text" placeholder="www.abclightroom.com" value={orgLink} onChange={(e) => setOrgLink(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label className="block text-dark-text font-light mb-2 font-montserrat" htmlFor="website">Password</label>
                                <input className="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="website" type="password" placeholder="**********" value={orgPassword} onChange={(e) => setOrgPassword(e.target.value)} />
                            </div>

                            <button className="bg-databoard-blue w-full hover:bg-blue-700 text-white h-15 font-light py-4 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit} type="button">
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                    </div>
                                ) : (
                                    'Register'
                                )}
                            </button>

                        </form>


                    </div>
                </div>);

            default:
                return null;
        }
    }
    return (

        <div className="flex  justify-end h-screen bg-databoard-blue ">
            <div className="bg-left bg-no-repeat bg-contain w-full flex-nowrap h-full absolute z-0 bg-setup  justify-end flex flex-row  items-center pt-100">
                <div className='hidden md:block basis-1/2'>

                </div>
                <div className='container mx-auto  sm:w-full md:lg:w-1/2 lg:w-1/3 md:mr-15 lg:mr-30'>
                    {renderStep()}
                </div>
            </div>




        </div>
    );
}

export default RegistrationForm;