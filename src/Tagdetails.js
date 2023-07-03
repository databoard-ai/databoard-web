
import {
    Box, Flex, Input, InputGroup, CloseButton, Icon, Button, Select, Text, HStack, Tr, Td, Th, TableContainer, VStack, Textarea, Tabs, TabList, Tab, TabPanels, TabPanel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Thead, Table, Tbody, Tfoot, Checkbox,
    NumberInput,
    NumberInputField,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    FormControl,
    FormLabel,
    CircularProgress,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useToast
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { BiFolderPlus, BiNoEntry } from "react-icons/bi";
import { IoSend, IoStarOutline } from "react-icons/io5";
import { BsFillStarFill, BsPerson, BsPeople, BsCalendar, BsSend } from "react-icons/bs";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";



const MAX_PAGES_TO_SHOW = 1;
export const Clocks = () => {
    const [isLoadingclocks, setIsLoadingclocks] = useState(false);
    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };
    const access_token = getAuthToken()
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    const toast = useToast()
    const { tag_id } = useParams();
    const [clocks, setclocks] = useState([]);
    const navigate = useNavigate();


    const fetchData = useCallback(async () => {
        const headers = {
            'Authorization': `Bearer ${access_token}`
        };
        setIsLoadingclocks(true);
        try {
            const response = await axios.get(`https://databoard-service.onrender.com/clocks/fetch_tag_clocks/${tag_id}`, { headers });
            if (response.data.status_code === 401) {
                toast({
                    position: 'top-center',
                    render: () => (
                        <Box color='white' p={3} bg='red.500' borderRadius="md">
                            Your session is ended. Please sign in again.
                        </Box>
                    ),
                });
                setIsLoadingclocks(false);
                navigate('/login');
            }
            response.data.data ? setclocks(response.data.data) : setclocks([]);
            setIsLoadingclocks(false);
        } catch (error) {
            toast({
                position: 'top-center',
                render: () => (
                    <Box color='white' p={3} bg='red.500' borderRadius="md">
                        Something went wrong: {error}
                    </Box>
                ),
            });
            setIsLoadingclocks(false);
        }
    }, [tag_id, navigate, toast]);



    useEffect(() => {

        fetchData();
    }, [fetchData]);




    const [genderFilter, setGenderFilter] = useState('');
    const [showGenderFilterDropdown, setShowGenderFilterDropdown] = useState(false);

    const handleGenderChange = (value) => {
        setGenderFilter(value);
        setShowGenderFilterDropdown(false);
    };

    const clearGenderFilter = () => {
        setGenderFilter('');
    };
    const GenderFilter = () => {


        return (
            <Flex alignItems="center">
                {genderFilter ? (
                    <FilterChip
                        label={`Gender: ${genderFilter}`}
                        onDelete={clearGenderFilter}
                        onDropdownToggle={() => setShowGenderFilterDropdown(!showGenderFilterDropdown)}
                    />
                ) : (
                    <Menu>
                        <MenuButton
                            as={Button}
                            variant="outline"
                            size="md"
                            borderRadius="full"
                            borderColor="gray.300"
                            px={3}
                            py={1}
                            rightIcon={<ChevronDownIcon />}
                            fontWeight="normal"

                        >
                            {genderFilter ? '' : 'Gender'
                            }
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => handleGenderChange("male")}>Male</MenuItem>
                            <MenuItem onClick={() => handleGenderChange("female")}>Female</MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
        );
    };
    const [fromAgeFilter, setFromAgeFilter] = useState(1);
    const [toAgeFilter, setToAgeFilter] = useState("");
    const [filterAge, setFilterAge] = useState(false);
    const [isAgeFilterMenuOpen, setIsAgeFilterMenuOpen] = useState(false);

    const handleFromAgeChange = (value) => {
        setFromAgeFilter(value);
    };

    const handleToAgeChange = (value) => {
        setToAgeFilter(value);
    };

    const applyAgeFilter = () => {
        setFilterAge(true);
        console.log(`Filtering age from ${fromAgeFilter} to ${toAgeFilter}`);
        closeAgeFilterMenu();
    };

    const clearAgeFilter = () => {
        setFromAgeFilter("");
        setToAgeFilter("");
        setFilterAge(false);
        closeAgeFilterMenu();
    };

    const openAgeFilterMenu = () => {
        setIsAgeFilterMenuOpen(true);
    };

    const closeAgeFilterMenu = () => {
        setIsAgeFilterMenuOpen(false);
    };

    const AgeFilter = () => {

        return (
            <Flex alignItems="center">
                {(fromAgeFilter && toAgeFilter && filterAge) ? (
                    <FilterChip
                        label={`Age: ${fromAgeFilter || ""} - ${toAgeFilter || ""}`}
                        onDelete={clearAgeFilter}
                    />
                ) : (
                    <div>
                        <Menu isOpen={isAgeFilterMenuOpen} onClose={closeAgeFilterMenu}>
                            <MenuButton
                                as={Button}
                                variant="outline"
                                size="md"
                                borderRadius="full"
                                borderColor="gray.300"
                                px={3}
                                py={1}
                                onClick={openAgeFilterMenu}
                                fontWeight="light"
                            >
                                Age
                                <ChevronDownIcon ml={2} />
                            </MenuButton>
                            <MenuList minWidth="auto" p="5">
                                <FormControl mb={2}>
                                    <FormLabel htmlFor="from-age" fontSize="sm">
                                        From
                                    </FormLabel>
                                    <NumberInput
                                        id="from-age"
                                        min={1}
                                        value={fromAgeFilter}
                                        onChange={handleFromAgeChange}
                                        size="sm"
                                    >
                                        <NumberInputField placeholder="From" />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="to-age" fontSize="sm">
                                        To
                                    </FormLabel>
                                    <NumberInput
                                        id="to-age"
                                        min={fromAgeFilter}
                                        value={toAgeFilter}
                                        onChange={handleToAgeChange}
                                        size="sm"
                                    >
                                        <NumberInputField placeholder="To" />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                                <Flex my={3}>
                                    <Button
                                        bg="primary"
                                        color="white"
                                        size="sm"
                                        onClick={applyAgeFilter}
                                        _hover={{ color: "white", bg: "primary", border: "1px solid white" }}
                                        value={true}
                                        mr={2}
                                    >
                                        Done
                                    </Button>
                                    <Button size="sm" onClick={clearAgeFilter}>
                                        Clear
                                    </Button>
                                </Flex>
                            </MenuList>
                        </Menu>
                    </div>
                )}
            </Flex>
        );
    };

    const [fromDateFilter, setFromDateFilter] = useState("");
    const [toDateFilter, setToDateFilter] = useState("");
    const [filterDate, setFilterDate] = useState(false);
    const [isDateFilterMenuOpen, setIsDateFilterMenuOpen] = useState(false);

    const handleFromDateChange = (event) => {
        setFromDateFilter(event.target.value);
    };

    const handleToDateChange = (event) => {
        setToDateFilter(event.target.value);
    };

    const applyDateFilter = () => {
        setFilterDate(true);
        console.log(`Filtering time from ${fromDateFilter} to ${toDateFilter}`);
        closeDateFilterMenu();
    };

    const clearDateFilter = () => {
        setFromDateFilter("");
        setToDateFilter("");
        setFilterDate(false);
        closeDateFilterMenu();
    };

    const openDateFilterMenu = () => {
        setIsDateFilterMenuOpen(true);
    };

    const closeDateFilterMenu = () => {
        setIsDateFilterMenuOpen(false);
    };
    const DateFilter = () => {


        return (
            <Flex alignItems="center">
                {(fromDateFilter && toDateFilter && filterDate) ? (
                    <FilterChip
                        label={`Time: ${fromDateFilter || ""} - ${toDateFilter || ""}`}
                        onDelete={clearDateFilter}
                    />
                ) : (
                    <div>
                        <Menu isOpen={isDateFilterMenuOpen} onClose={closeDateFilterMenu}>
                            <MenuButton
                                as={Button}
                                variant="outline"
                                size="md"
                                borderRadius="full"
                                borderColor="gray.300"
                                px={3}
                                py={1}
                                onClick={openDateFilterMenu}
                                fontWeight="normal"
                            >
                                Date
                                <ChevronDownIcon ml={2} />
                            </MenuButton>
                            <MenuList minWidth="auto" p="5">
                                <FormControl mb={2}>
                                    <FormLabel htmlFor="from-time" fontSize="sm">
                                        From
                                    </FormLabel>
                                    <input id="from-date" type="date" value={fromDateFilter} onChange={handleFromDateChange}></input>
                                </FormControl>
                                <FormControl>
                                    <FormLabel ht   mlFor="to-time" fontSize="sm">
                                        To
                                    </FormLabel>
                                    <input id="to-date" type="date" value={toDateFilter} onChange={handleToDateChange}></input>
                                </FormControl>
                                <Flex my={3}>
                                    <Button
                                        bg="primary"
                                        color="white"
                                        size="sm"
                                        onClick={applyDateFilter}
                                        _hover={{ color: "white", bg: "primary", border: "1px solid white" }}
                                        value={true}
                                        mr={2}
                                    >
                                        Done
                                    </Button>
                                    <Button size="sm" onClick={clearDateFilter}>
                                        Clear
                                    </Button>
                                </Flex>
                            </MenuList>
                        </Menu>
                    </div>
                )}
            </Flex>
        );
    };

    const [fromRatingFilter, setFromRatingFilter] = useState(1);
    const [toRatingFilter, setToRatingFilter] = useState("");
    const [filterRating, setFilterRating] = useState(false);
    const [isRatingFilterMenuOpen, setIsRatingFilterMenuOpen] = useState(false);

    const handleFromRatingChange = (value) => {
        setFromRatingFilter(value);
    };

    const handleToRatingChange = (value) => {
        setToRatingFilter(value);
    };

    const applyRatingFilter = () => {
        setFilterRating(true);
        console.log(`Filtering rating from ${fromRatingFilter} to ${toRatingFilter}`);
        closeRatingFilterMenu();
    };

    const clearRatingFilter = () => {
        setFromRatingFilter("");
        setToRatingFilter("");
        setFilterRating(false);
        closeRatingFilterMenu();
    };

    const openRatingFilterMenu = () => {
        setIsRatingFilterMenuOpen(true);
    };

    const closeRatingFilterMenu = () => {
        setIsRatingFilterMenuOpen(false);
    };

    const RatingFilter = () => {


        return (
            <Flex alignItems="center">
                {(fromRatingFilter && toRatingFilter && filterRating) ? (
                    <FilterChip
                        label={`Rating: ${fromRatingFilter || ""} - ${toRatingFilter || ""}`}
                        onDelete={clearRatingFilter}
                    />
                ) : (
                    <div>
                        <Menu isOpen={isRatingFilterMenuOpen} onClose={closeRatingFilterMenu}>
                            <MenuButton
                                as={Button}
                                variant="outline"
                                size="md"
                                borderRadius="full"
                                borderColor="gray.300"
                                px={3}
                                py={1}
                                onClick={openRatingFilterMenu}
                                fontWeight="normal"
                            >
                                Rating
                                <ChevronDownIcon ml={2} />
                            </MenuButton>
                            <MenuList minWidth="auto" p="5">
                                <FormControl mb={2}>
                                    <FormLabel htmlFor="from-rating" fontSize="sm">
                                        From
                                    </FormLabel>
                                    <NumberInput
                                        id="from-rating"
                                        min={1}
                                        value={fromRatingFilter}
                                        onChange={handleFromRatingChange}
                                        size="sm"
                                    >
                                        <NumberInputField placeholder="From" />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="to-rating" fontSize="sm">
                                        To
                                    </FormLabel>
                                    <NumberInput
                                        id="to-rating"
                                        min={fromRatingFilter}
                                        value={toRatingFilter}
                                        onChange={handleToRatingChange}
                                        size="sm"
                                    >
                                        <NumberInputField placeholder="To" />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                                <Flex my={3}>
                                    <Button
                                        bg="primary"
                                        color="white"
                                        size="sm"
                                        onClick={applyRatingFilter}
                                        _hover={{ color: "white", bg: "primary", border: "1px solid white" }}
                                        value={true}
                                        mr={2}
                                    >
                                        Done
                                    </Button>
                                    <Button size="sm" onClick={clearRatingFilter}>
                                        Clear
                                    </Button>
                                </Flex>
                            </MenuList>
                        </Menu>
                    </div>
                )}
            </Flex>
        );
    };

    const filterData = () => {
        let filteredData = [...clocks];
        // Filter by date
        if (fromDateFilter !== '' && toDateFilter !=='') {
          filteredData = filteredData.filter(item => {
            return item.date >= fromDateFilter && item.date <= toDateFilter;
          });
        }
        if (fromAgeFilter !== '' && toAgeFilter !=='') {
            filteredData = filteredData.filter(item => {
              return item.age >= fromAgeFilter && item.age <= toAgeFilter;
            });
          }

          if (fromRatingFilter !== '' && toRatingFilter !=='') {
            filteredData = filteredData.filter(item => {
              return item.rating >= fromRatingFilter && item.rating <= toRatingFilter;
            });
          }
    
        // Filter by gender
        if (genderFilter !== '') {
          filteredData = filteredData.filter(item => item.gender.toLowerCase() === genderFilter);
        }
    
        return filteredData;
      };
    const filteredData = filterData();


  
    const [fileFormat, setFileFormat] = useState("");
    const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);

    const handleDownloadFileFormat = (value) => {
        setFileFormat(value);
        setShowDownloadDropdown(false);
    };
    const DownloadSelector = () => {

        return (
            <Flex alignItems="center">
                <Menu isOpen={showDownloadDropdown} onClose={() => setShowDownloadDropdown(false)}>
                    <MenuButton
                        as={Button}
                        variant="outline"
                        size="md"
                        borderRadius="sm"
                        borderColor="gray.300"
                        px={3}
                        py={1}
                        w="5.5vw"
                        rightIcon={<ChevronDownIcon />}
                        onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                    >
                        {fileFormat ? `Download: ${fileFormat}` : "Download as:"}
                    </MenuButton>

                    <MenuList>
                        <MenuItem onClick={() => handleDownloadFileFormat("csv")} fontSize="sm">
                            .csv
                        </MenuItem>
                        <MenuItem onClick={() => handleDownloadFileFormat("xlsx")} fontSize="sm">
                            .xlsx
                        </MenuItem>
                        <MenuItem onClick={() => handleDownloadFileFormat("pdf")} fontSize="sm">
                            .pdf
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        );
    };


    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);


    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredData.length / pageSize);

    // Calculate the index of the first and last item on the current page
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;

    // Get the items for the current page
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getPageRange = () => {
        const totalPagesToShow = MAX_PAGES_TO_SHOW * 2 + 1; // Total number of pages to show, including the current page
        let startPage = currentPage - MAX_PAGES_TO_SHOW;
        let endPage = currentPage + MAX_PAGES_TO_SHOW;

        // Adjust the start and end page if they exceed the total number of pages
        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPagesToShow, totalPages);
        } else if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - totalPagesToShow + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };
    const clearAllFilters = () => {
        clearAgeFilter();
        clearGenderFilter();
        clearDateFilter();
        clearRatingFilter();
    };

    const ClearFilterChip = () => {
        return (
            <Flex alignItems="center">
                <Button
                    variant="outline"
                    size="md"
                    borderRadius="full"
                    borderColor="gray.300"
                    px={3}
                    py={1}
                    colorScheme="red"
                    onClick={clearAllFilters}
                    rightIcon={<CloseIcon boxShadow="sm" />}
                >
                    Clear filter(s)
                </Button>
            </Flex>
        );
    };


    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }


    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleRowSelection = (rowId) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(rowId)) {
                return prevSelectedRows.filter((id) => id !== rowId);
            } else {
                return [...prevSelectedRows, rowId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
            setSelectAll(false);
        } else {
            const allRowIds = filteredData.map((clock) => clock.id);
            setSelectedRows(allRowIds);
            setSelectAll(true);
        }
    };



    const [isOpen, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleTabChange = (index) => {
        setSelectedTab(index);
    };



    return (
        <Box width="100vw" h="100vh">
            <Box position="sticky"
                top="0"
                zIndex="sticky"
                bg="primary"
                px="20px"
                py="10px"
                h="11vh"
                overflow="hidden"
            >
                <Flex width="full" px="3em" py="20px" bg="primary" alignItems="flex-end" position="fixed" overflow="hidden">
                    <Flex verticalAlign="center">
                        <Box size={{ base: "10px", sm: "20px", md: "20px" }} px="2" verticalAlign="center" pt="1" color="white">
                            Agrotech Seminar
                        </Box>
                    </Flex>
                    <InputGroup ml="auto" width={{ base: "8.5vw", sm: "10em", md: "10vw", lg: "10vw", xl: "10vw" }}>
                        <Input
                            type="text"
                            placeholder="Search..."
                            borderRadius="md"
                            px="5"
                            bg="white"
                            _focus={{ outline: "1px solid primary", boxShadow: "none" }}
                            height="40px"
                            pr="40px"
                            textAlign="left"
                        />
                    </InputGroup>
                </Flex>
            </Box>
            <Flex width="full" height="10vh" flexDirection="row" bg="#F4F4F4" top={{ base: "6vh", sm: "6vh", md: "8vh", lg: "8vh", xl: "8vh" }} alignItems="center" justifyItems="center" overflow="hidden">
                <Box display="flex" flexDirection="row" justifyContent="space-between" px="5em" width="full">
                    <HStack justify="flex-start">
                        <GenderFilter /><AgeFilter /><DateFilter /><RatingFilter />
                        {(toAgeFilter && fromAgeFilter) || (fromRatingFilter && toRatingFilter) || (fromDateFilter && toDateFilter) || genderFilter ? (
                            <ClearFilterChip />
                        ) : null}
                    </HStack>
                    <HStack justify="flex-end">
                        <Box
                            mx="10"
                            width={{ base: "8vw", md: "15em", sm: "15em", lg: "15em", xl: "20em" }}
                            as="button"
                            _hover={{ bg: "#3672c2" }}
                            borderRadius="0.5em"
                        >
                            <Flex direction="row">
                                <Button
                                    px="2em"
                                    h="3em"
                                    bg="#4283E4"
                                    borderRadius="0.5em"
                                    _hover={{ bg: "#3672c2" }}
                                    flex="1"
                                    alignItems="center"
                                    onClick={handleOpenModal}
                                >
                                    <Flex direction="row" alignItems="center">
                                        <Icon as={IoSend} boxSize={3.5} color="white" transform="rotate(315deg)" mr="1.5em" />
                                        <Box w="0.2em" bg="#ffffff" h="full"></Box>
                                        <Text color="white" fontSize={{ base: "0.6em", md: "0.65em", sm: "0.8em", lg: "0.8em" }}>
                                            Broadcast message
                                        </Text>
                                    </Flex>
                                </Button>

                            </Flex>
                        </Box>
                        <DownloadSelector />
                    </HStack>
                </Box>
            </Flex>
            <Box>
                <Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Send message to</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Tabs index={selectedTab} onChange={handleTabChange} isLazy>
                                <TabList isFitted>
                                    <Tab flex={1}><Icon as={BsPerson} mr="1em" /><Text fontWeight="bold">Individual</Text></Tab>
                                    <Tab flex={1}><Icon as={BsPeople} mr="1em" /><Text fontWeight="bold">Broadcast</Text></Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <VStack spacing={4}>
                                            <Textarea placeholder="Enter message for Tab 1" rows={4} />
                                            <Textarea placeholder="Enter additional information for Tab 1" rows={4} />
                                        </VStack>
                                    </TabPanel>
                                    <TabPanel>
                                        <VStack spacing={4}>
                                            <Textarea placeholder="Enter message for Tab 1" rows={4} />
                                            <Textarea placeholder="Enter additional information for Tab 1" rows={4} />
                                        </VStack>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </ModalBody>
                        <ModalFooter>
                            <Flex alignContent="space-between">
                                <Button colorScheme="blue" mr={3} leftIcon={<BsSend />} width="12em" py="1.5em">
                                    <Text color="white" fontWeight="medium">Send</Text>
                                </Button>
                                <Button colorScheme="white" leftIcon={<BsCalendar color="grey" />} border="1px solid grey" width="12em" py="1.5em">
                                    <Text color="grey" fontWeight="medium">Schedule</Text>
                                </Button>
                            </Flex>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                {isLoadingclocks ? (
                    <Flex width="full" height="full" alignItems="center" justifyContent="center">
                        <CircularProgress isIndeterminate color="blue.500" size="80px" thickness="5px" />
                    </Flex>
                ) : filteredData.length === 0 ? (
                    <Flex width="full" height="full" alignItems="center" justifyContent="center" direction="column" pt="30vh">
                        <Icon as={BiNoEntry} boxSize="40" color="gray.600" />
                        <Text alignContent="center" color="#121212" fontSize="16px">Oops!</Text>
                        <Text alignContent="center" color="#121212" fontSize="16px">
                            No clocks yet for this tag</Text>
                    </Flex>
                ) :

                    <TableContainer>
                        <Table variant="simple" border="0.5 solid #C3C3C3" color="dark">
                            <Thead mt="30vh"
                                top={0}
                                bg="white"
                                zIndex={1}
                                width="100%"
                                boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)">
                                <Tr>
                                    <Td sx={{ paddingRight: { base: "50px", sm: "100px", md: "200px" } }}>
                                        <Checkbox isChecked={selectAll} onChange={handleSelectAll} />
                                    </Td>
                                    <Th fontSize="16px" sx={{ paddingRight: { base: "50px", sm: "100px", md: "200px" } }}>Name</Th>
                                    <Th fontSize="16px" sx={{ paddingRight: { base: "50px", sm: "100px", md: "200px" } }}>Gender</Th>
                                    <Th fontSize="16px" sx={{ paddingRight: { base: "50px", sm: "100px", md: "200px" } }}>Rating</Th>
                                    <Th isNumeric fontSize="16px" sx={{ paddingRight: { base: "50px", sm: "100px", md: "200px" } }}>
                                        Date
                                    </Th>
                                    <Th isNumeric fontSize="16px" sx={{ paddingRight: { base: "50px", sm: "100px", md: "200px" } }}>
                                        Time In
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody fontWeight="light">
                                {currentItems.map((clock) => (
                                    <Tr key={clock.user_id}>
                                        <Td>
                                            <Checkbox
                                                isChecked={selectedRows.includes(clock.id)}
                                                onChange={() => handleRowSelection(clock.id)}
                                            />
                                        </Td>
                                        <Td>  
                                            
                                        <HStack>
                                            <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            bg="red.500"
                                            borderRadius="full"
                                            width={{ base: "30px", sm: "30px", md: "30px" }}
                                            height={{ base: "30px", sm: "30px", md: "30px" }}
                                        >
                                            <Text fontSize={{ base: "10px", sm: "10px", md: "10px" }} color="white">
                                                {clock.fname.charAt(0).toUpperCase()+""+clock.lname.charAt(0).toUpperCase()}
                                            </Text>
                                        </Box> <Text color="black">{clock.fname +" "+ clock.lname}</Text></HStack></Td>
                                        <Td>{clock.gender}</Td>
                                        <Td>
                                            <HStack>
                                                <Icon as={BsFillStarFill} color="primary" />
                                                <Icon as={BsFillStarFill} color="primary" />
                                                <Icon as={BsFillStarFill} color="primary" />
                                                <Icon as={BsFillStarFill} color="primary" />
                                                <Icon as={IoStarOutline} />
                                            </HStack>
                                        </Td>
                                        <Td><Text color="black">{clock.date}</Text></Td>
                                        <Td><Text color="black">{clock.time}</Text></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Td colSpan={6}>
                                        <Flex justifyContent="space-between" alignItems="center">
                                            <Box>
                                                <Box>
                                                    <Text as="span" fontSize="sm">
                                                        Rows per page:
                                                    </Text>
                                                    <Select
                                                        size="sm"
                                                        value={pageSize}
                                                        onChange={handlePageSizeChange}
                                                        borderRadius="md"
                                                    >
                                                        <option value={5}>5</option>
                                                        <option value={10}>10</option>
                                                        <option value={40}>40</option>
                                                    </Select>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Flex justifyContent="center" alignItems="center">
                                                    {
                                                        currentPage === 1 ?
                                                            <Flex></Flex> :
                                                            <Button
                                                                size="lg"
                                                                disabled={currentPage === 1}
                                                                variant="link"
                                                                onClick={() => handlePageChange(currentPage - 1)}
                                                                rightIcon={<ChevronLeftIcon />}
                                                            >
                                                            </Button>
                                                    }
                                                    {currentPage > MAX_PAGES_TO_SHOW + 2 && (
                                                        <>
                                                            <Button size="sm" key={1} colorScheme={currentPage === 1 ? "blue" : "gray"}
                                                                variant="link"
                                                                onClick={() => handlePageChange(1)}>
                                                                1
                                                            </Button>
                                                            <Text mx={1}>...</Text>
                                                        </>
                                                    )}
                                                    {getPageRange().map((page) => (
                                                        <Button
                                                            key={page}
                                                            size="sm"
                                                            variant="link"
                                                            colorScheme={currentPage === page ? "blue" : "gray"}
                                                            onClick={() => handlePageChange(page)}
                                                        >
                                                            {page}
                                                        </Button>
                                                    ))}
                                                    {currentPage < totalPages - MAX_PAGES_TO_SHOW - 1 && (
                                                        <>
                                                            <Text mx={1}>...</Text>
                                                            <Button size="sm" variant="link" colorScheme={currentPage === totalPages ? "blue" : "gray"}
                                                                onClick={() => handlePageChange(totalPages)}>
                                                                {totalPages}
                                                            </Button>
                                                        </>
                                                    )}
                                                    {
                                                        currentPage === totalPages ? <Flex></Flex> :
                                                            <Button
                                                                size="lg"
                                                                variant="link"
                                                                color="primary"
                                                                disabled={currentPage === totalPages}
                                                                onClick={() => handlePageChange(currentPage + 1)}
                                                                rightIcon={<ChevronRightIcon color="primary" />}
                                                            >

                                                            </Button>
                                                    }
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    </Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>

                }
            </Box>
        </Box>
    );
};


const FilterChip = ({ label, onDelete, onDropdownToggle }) => {
    return (
        <Flex alignItems="center">
            <Button
                variant="outline"
                size="md"
                borderRadius="full"
                borderColor="gray.300"
                px={3}
                py={1}
                fontWeight="light"
            >
                {label}
            </Button>
            <CloseButton size="sm" onClick={onDelete} />
        </Flex>
    );
};


