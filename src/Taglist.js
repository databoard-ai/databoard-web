import React, { useState, useEffect } from "react";
import { Box, Flex, Input, InputGroup, Icon, Button, Text, SimpleGrid, useToast, Menu, MenuButton, MenuList, MenuItem, Divider,Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,CircularProgress } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { BiQrScan, BiDotsVertical, BiBookOpen } from "react-icons/bi";
import { FaInfinity } from "react-icons/fa";
import { IoPulseOutline } from "react-icons/io5";
import { AiOutlineDelete, AiOutlinePrinter, AiOutlineCheckSquare, AiTwotoneEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsInfoCircle } from 'react-icons/bs';
import DatePicker from './DatePicker.js';
import TimePicker from "./TimePicker.js";
import { useDisclosure } from "@chakra-ui/react";


export const Taglist = () => {

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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
      if(infiniteTag===true){
        setEndDate('');
        setEndTime('');
      }
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

  useEffect(() => {
    const access_token = getAuthToken()
    const headers = {
      'Authorization': `Bearer ${access_token}`
    };
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('https://databoard-service.onrender.com/tags/fetch_all', { headers });
        setData(response.data.data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const TagComponent = ({ tag }) => {
    const { _id, email, tag_name, tag_type, start_date, end_date, start_time, end_time, qr, tag_code } = tag;
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
      setMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
      setMenuOpen(false);
    };



 
    return (

      <Box
        position="relative"
        width={{ base: "10em", sm: "13em", md: "13em", lg: "13em" }}
        height={{ base: "10em", sm: "13em", md: "13em", lg: "13em" }}
        borderRadius="md"
        borderWidth="0.02em"
        borderColor="gray.200"
        p="1em"
        boxShadow="md"
      > <Link to="/tagdetails">
          <Flex direction="column" alignItems="center" justifyContent="center">
            <Icon as={BiQrScan} boxSize={{ base: 16, sm: 28 }} color="#4283E4" />

            {tag_type === "infinite" ? (
              <Icon as={FaInfinity} boxSize={5} color="#4283E4" my="2" />
            ) : (
              <Icon as={IoPulseOutline} boxSize={5} color="#1E1E1E" my="2" />
            )}

            <Text color="#121212" fontSize={{ base: "12px", sm: "14px" }} textAlign="center">
              {tag_name}
            </Text>
          </Flex>
        </Link>

        <Menu isOpen={isMenuOpen} onClose={handleMenuClose}>
          <MenuButton
            as={Box}
            position="absolute"
            top="2"
            right="5"
            zIndex="0"
            cursor="pointer"
            onClick={handleMenuToggle}
          >
            <Icon as={BiDotsVertical} boxSize={5} color="#1E1E1E" />
          </MenuButton>
          <MenuList
            bg="#FEFEFE"
            color="#1E1E1E"
            boxShadow="md"
            borderRadius="md"
            py="2"
            px="2"
            minWidth="10em"
            _focus={{ outline: "none" }}
            zIndex={5}
          >
            <MenuItem _hover={{ bg: "gray.100" }} icon={<BiBookOpen />} px="2" my="1" fontSize="1.0em" fontWeight="bold">
              Open tag
            </MenuItem>
            <Divider />
            <MenuItem _hover={{ bg: "gray.100" }} icon={<AiTwotoneEdit />} px="2" my="1">
              Rename
            </MenuItem>
            <Divider />
            <MenuItem _hover={{ bg: "gray.100" }} icon={<AiOutlineCheckSquare />} px="2" my="1">
              Select multiple
            </MenuItem>
            <MenuItem _hover={{ bg: "gray.100" }} icon={<AiOutlinePrinter />} px="2" my="1">
              Print
            </MenuItem>
            <MenuItem _hover={{ bg: "gray.100" }} icon={<IoPulseOutline />} px="2" my="1">
              Tag analysis
            </MenuItem>
            <MenuItem _hover={{ bg: "gray.100" }} icon={<AiOutlineDelete />} px="2" my="1">
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

    );
  };

  return (
    <Flex width="full" direction="column">
         <Modal isOpen={isModalOpen} onClose={closeModal} size="lg" mt="10" zIndex="999999">
        <ModalOverlay />
        <ModalContent style={{ top: "5%",
      transform: "translateY(50%)",
      position: "fixed",
      left: "50%",
      marginLeft: "-200px",}}>
          {/* <ModalHeader>Create an event tag</ModalHeader> */}
          <ModalBody>
           <Flex w="full" direction="row">
           <div className='container mx-auto w-full md:w-1 lg:w-full'>
                    <div className='h-full mx-auto bg-white rounded-sm px-10'>
                        <div className="    h-full py-24 px-30">

                            <h2 className="text-5xl mb-2 font-montserrat text-dark-text">Create an event tag</h2>
                            <p className='py-5 font-extralight text-xl  text-dark-text'>Create a tag for your event to help you acess the data of your attendees</p>
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

                                    <DatePicker label="End Date" value={endDate} onChange={handleEndDateChange} disabled={infiniteTag} />
                                    <TimePicker label="End Time" value={endTime} onChange={handleEndTimeChange} disabled={infiniteTag}/>
                                </div>

                                <button className="bg-databoard-blue w-full hover:bg-blue-700 text-white h-15 font-light py-4 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >
                                    Create new tag
                                </button>

                            </form>


                        </div>
                    </div>
                </div>
           </Flex>
        
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box position="sticky" top="0" zIndex={6000}>
        <Flex width="full" px="20px" py="20px" bg="#4283E4" alignItems="flex-end">
          <Flex verticalAlign="center" my={{ base: "10px", sm: "0px" }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="red.500"
              borderRadius="full"
              width={{ base: "30px", sm: "50px", md: "60px" }}
              height={{ base: "30px", sm: "50px", md: "60px" }}
            >
              <Text fontSize={{ base: "10px", sm: "16px", md: "20px" }} color="white">
                AL
              </Text>
            </Box>
            <Box ml="10px" mt={{ base: "0.5em", sm: "0.7em" }}>
              <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Text fontSize={{ base: "8px", sm: "20px", md: "20px" }} color="white">
                  Abc Light room
                </Text>
              </Flex>
            </Box>
          </Flex>
          <InputGroup ml="auto" width="250px">
            <Input
              type="text"
              placeholder="Search..."
              borderRadius="md"
              bg="white"
              px="5"
              _focus={{ outline: "1px solid primary", boxShadow: "none" }}
              width={{ base: "60vw", sm: "full" }}
              height="40px"
              textAlign="left"
            />
          </InputGroup>
        </Flex>
      </Box>
      <Box height="90vh" bg="#FEFEFE" display="flex" alignItems="" justifyContent="flex-start" p="1em" flexDirection="column">
        {isLoading ?
            <Flex width="full" height="full" alignItems="center" justifyContent="center">
            <CircularProgress isIndeterminate color="blue.500" size="80px" thickness="8px" />
          </Flex> : <SimpleGrid   justifyContent="center"  p={{ base: "8px", sm: "12px" }} spacing={2} minChildWidth={{ base: "8em", sm: "13em", md: "13em", lg: "13em" }} justifyItems="center" >
            {data.map((tag) => (
              <TagComponent key={tag.id} tag={tag} />
            ))}
          </SimpleGrid>
        }
      </Box>
        <Button
          position="fixed"
          bottom="8"
          right="4"
          mx="10"
          width="200px"
          as="button"
          // onClick={() => toast({
          //   title: 'Account created.',
          //   description: "We've created your account for you.",
          //   status: 'success',
          //   duration: 9000,
          //   isClosable: true,
          // })}

        >
          <Flex direction="row" as="button" onClick={openModal}>
            <Button
              px="2em"
              py="1em"
              bg="#4283E4"
              borderTopLeftRadius="0.5em"
              borderBottomLeftRadius="0.5em"
              borderTopRightRadius="none"
              borderBottomRightRadius="none"
              flex="1"
              alignItems="center"
              justifyContent="center"
              _focusWithin={{ bg: "#3672c2" }}
              _hover={{ bg: "primary" }}
              
            >
              <Icon as={AddIcon} boxSize="2" color="white" />
            </Button>
            <Box bg="#ffff" w="0.12em"></Box>
            <Button
              borderTopRightRadius="0.5em"
              borderBottomRightRadius="0.5em"
              borderTopLeftRadius="none"
              borderBottomLeftRadius="none"
              bg="#4283E4"
              px="1em"
              py="1em"
              flex="14"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _focusWithin={{ bg: "#3672c2" }}
              _hover={{ bg: "primary" }}
            >
              <Text color="white" fontSize="0.8em" fontWeight="400">
                Create new tag
              </Text>
            </Button>
          </Flex>
        </Button>
      

    </Flex>
  );
};