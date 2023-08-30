import React, { useState, useEffect, useCallback } from "react";
import { Box, Flex, Input, InputGroup, Icon, Button, Text, useToast, Menu, MenuButton, MenuList, MenuItem, Divider, Modal, ModalOverlay, ModalContent, ModalBody, CircularProgress } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { BiQrScan, BiDotsVertical, BiBookOpen, BiFolderPlus } from "react-icons/bi";
import { FaInfinity } from "react-icons/fa";
import { IoPulseOutline } from "react-icons/io5";
import { AiOutlineDelete, AiOutlinePrinter, AiOutlineCheckSquare, AiTwotoneEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsInfoCircle } from 'react-icons/bs';
import DatePicker from '../components/DatePicker.js';
import TimePicker from "../components/TimePicker.js";
import fetchTags from '../redux/reducers/tagsSlice';



export const Taglist = () => {

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const [isLoadingTagCreation, setIsLoadingTagCreation] = useState(false);
  const org_name = localStorage.getItem('org_name')
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [email, setEmail] = useState("");
  const [tagName, setTagName] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const access_token = getAuthToken()

  const toast = useToast()
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
    if (infiniteTag === true) {
      setEndDate('');
      setEndTime('');
    }
  }

  const createTag = async (e) => {
    const headers = {
      'Authorization': `Bearer ${access_token}`
    };
    e.preventDefault();
    setIsLoadingTagCreation(true)
    setEmail(localStorage.getItem('email'))

    setEmail("johndoe@databoard.ai")

    if (email.trim() !== '' && tagName.trim() !== '' && startDate.trim() !== '' && startTime.trim() !== '') {
      try {
        const response = await axios.post('https://databoard-service.onrender.com/tags/create', {
          email: email,
          tag_name: tagName,
          start_date: startDate,
          tag_type: infiniteTag ? "infinite" : "finite",
          start_time: startTime,
          end_date: endDate,
          end_time: endTime

        }, { headers });

        // Handle response from API
        if (response.status === 200) {
          // successful
          setIsLoadingTagCreation(false)
          setIsModalOpen(false)
          fetchData();
          toast({
            position: 'top-center',
            render: () => (
              <Box color='white' p={3} bg='green.500' borderRadius="md">
                Tags created successfully
              </Box>
            ),
          });

        } else {
          //  failed
          setIsLoadingTagCreation(false)
          toast({
            position: 'top-center',
            render: () => (
              <Box color='white' p={3} bg='red.500' borderRadius="md">
                Something went wrong:
              </Box>
            ),
          })
        }
      } catch (error) {
        setIsLoadingTagCreation(false)

        toast({
          position: 'top-center',
          render: () => (
            <Box color='white' p={3} bg='red.500' borderRadius="md">
              Something went wrong: {error}
            </Box>
          ),
        })
      }
    } else {
      setIsLoadingTagCreation(false)
      toast({
        position: 'top-center',
        render: () => (
          <Box color='white' p={3} bg='red.500' borderRadius="md">
            All fields are required
          </Box>
        ),
      });
    }
  }
  const fetchData = useCallback(async () => {
    try {
      dispatch(loginUser(credentials)).then((response)=>{
        const statusCode = response.meta.status;
        const responseData = response.payload.data;

        if (statusCode===401){
          toast({
            position: 'top-center',
            render: () => (
              <Box color='white' p={3} bg='red.500' borderRadius="md">
                Your session is ended. Please sign in again.
              </Box>
            ),
          });
          navigate('/login');
        }
     
      responseData.data ? setData(responseData.data) : setData([]);
     
    }); 
  }catch (error) {
      toast({
        position: 'top-center',
        render: () => (
          <Box color='white' p={3} bg='red.500' borderRadius="md">
            Something went wrong: {error}
          </Box>
        ),
      });
    }
  }, [toast, navigate]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const TagComponent = ({ tag }) => {

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
      setMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
      setMenuOpen(false);
    };

    const viewTag = (tag_code) => {
      navigate(`/tagdetails/${tag_code}`);
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
      >
        <Flex direction="column" alignItems="center" justifyContent="center" onClick={() => viewTag(tag.tag_code)}>
          <Icon as={BiQrScan} boxSize={{ base: 16, sm: 28 }} color="#4283E4" />

          {tag.tag_type === "infinite" ? (
            <Icon as={FaInfinity} boxSize={5} color="#4283E4" my="2" />
          ) : (
            <Icon as={IoPulseOutline} boxSize={5} color="#1E1E1E" my="2" />
          )}

          <Text color="#121212" fontSize={{ base: "12px", sm: "14px" }} textAlign="center">
            {tag.tag_name}
          </Text>
        </Flex>


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
        <ModalContent style={{
          top: "5%",
          transform: "translateY(50%)",
          position: "fixed",
        }}>
          {/* <ModalHeader>Create an event tag</ModalHeader> */}
          <ModalBody>
            <Flex w="full" direction="row">
              <div className='container mx-auto w-full md:w-full lg:w-full'>
                <div className='h-full mx-auto bg-white rounded-sm px-8'>
                  <div className="    h-full py-24 px-30">

                    <h2 className="text-5xl mb-2 font-montserrat text-dark-text">Create an event tag</h2>
                    <p className='py-5 font-extralight text-xl  text-dark-text'>Create a tag for your event to help you access the data of your attendees</p>
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
                        <TimePicker label="End Time" value={endTime} onChange={handleEndTimeChange} disabled={infiniteTag} />
                      </div>

                      <button className="bg-databoard-blue w-full hover:bg-blue-700 text-white h-15 font-light py-4 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={createTag} >
                        {isLoadingTagCreation ? (
                          <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          </div>
                        ) : (
                          'Create new tag'
                        )}
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
                  {org_name}
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
        {isLoadingTags ? (
          <Flex width="full" height="full" alignItems="center" justifyContent="center">
            <CircularProgress isIndeterminate color="blue.500" size="80px" thickness="5px" />
          </Flex>
        ) : data.length === 0 ? (
          <Flex width="full" height="full" alignItems="center" justifyContent="center" direction="column">
            <Icon as={BiFolderPlus} boxSize="40" color="gray.600" />
            <Text alignContent="center" color="#121212" fontSize="16px">Your first time?</Text>
            <Text alignContent="center" color="#121212" fontSize="16px">
              Create a new tag and lets begin</Text>
          </Flex>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            {data.map((tag) => (
              <TagComponent key={tag.id} tag={tag} />
            ))}
          </div>
        )}
      </Box>
      {isLoadingTags ? <p></p> :
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
      }
    </Flex>
  );
};