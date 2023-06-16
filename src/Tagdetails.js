
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
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { IoSend, IoStarOutline } from "react-icons/io5";
import { BsFillStarFill, BsPerson, BsPeople, BsCalendar, BsSend } from "react-icons/bs";
import React, { useState } from "react";

const MAX_PAGES_TO_SHOW = 1;
export const Tagdetails = () => {

    const [gender, setGender] = useState('');
    const [showGenderFilterDropdown, setShowGenderFilterDropdown] = useState(false);

    const handleGenderChange = (value) => {
        setGender(value);
        setShowGenderFilterDropdown(false);
    };

    const clearGenderFilter = () => {
        setGender('');
    };
    const GenderFilter = () => {


        return (
            <Flex alignItems="center">
                {gender ? (
                    <FilterChip
                        label={`Gender: ${gender}`}
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

                        >
                            {gender ? '' : 'Gender'
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
    const [fromAge, setFromAge] = useState(1);
    const [toAge, setToAge] = useState("");
    const [filterAge, setFilterAge] = useState(false);
    const [isAgeFilterMenuOpen, setIsAgeFilterMenuOpen] = useState(false);

    const handleFromAgeChange = (value) => {
        setFromAge(value);
    };

    const handleToAgeChange = (value) => {
        setToAge(value);
    };

    const applyAgeFilter = () => {
        setFilterAge(true);
        console.log(`Filtering age from ${fromAge} to ${toAge}`);
        closeAgeFilterMenu();
    };

    const clearAgeFilter = () => {
        setFromAge("");
        setToAge("");
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
                {(fromAge && toAge && filterAge) ? (
                    <FilterChip
                        label={`Age: ${fromAge || ""} - ${toAge || ""}`}
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
                                        value={fromAge}
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
                                        min={fromAge}
                                        value={toAge}
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

    const [fromTime, setFromTime] = useState(1);
    const [toTime, setToTime] = useState("");
    const [filterTime, setFilterTime] = useState(false);
    const [isTimeFilterMenuOpen, setIsTimeFilterMenuOpen] = useState(false);

    const handleFromTimeChange = (value) => {
        setFromTime(value);
    };

    const handleToTimeChange = (value) => {
        setToTime(value);
    };

    const applyTimeFilter = () => {
        setFilterTime(true);
        console.log(`Filtering time from ${fromTime} to ${toTime}`);
        closeTimeFilterMenu();
    };

    const clearTimeFilter = () => {
        setFromTime("");
        setToTime("");
        setFilterTime(false);
        closeTimeFilterMenu();
    };

    const openTimeFilterMenu = () => {
        setIsTimeFilterMenuOpen(true);
    };

    const closeTimeFilterMenu = () => {
        setIsTimeFilterMenuOpen(false);
    };
    const TimeFilter = () => {


        return (
            <Flex alignItems="center">
                {(fromTime && toTime && filterTime) ? (
                    <FilterChip
                        label={`Time: ${fromTime || ""} - ${toTime || ""}`}
                        onDelete={clearTimeFilter}
                    />
                ) : (
                    <div>
                        <Menu isOpen={isTimeFilterMenuOpen} onClose={closeTimeFilterMenu}>
                            <MenuButton
                                as={Button}
                                variant="outline"
                                size="md"
                                borderRadius="full"
                                borderColor="gray.300"
                                px={3}
                                py={1}
                                onClick={openTimeFilterMenu}
                            >
                                Time
                                <ChevronDownIcon ml={2} />
                            </MenuButton>
                            <MenuList minWidth="auto" p="5">
                                <FormControl mb={2}>
                                    <FormLabel htmlFor="from-time" fontSize="sm">
                                        From
                                    </FormLabel>
                                    <NumberInput
                                        id="from-time"
                                        min={1}
                                        value={fromTime}
                                        onChange={handleFromTimeChange}
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
                                    <FormLabel htmlFor="to-time" fontSize="sm">
                                        To
                                    </FormLabel>
                                    <NumberInput
                                        id="to-time"
                                        min={fromTime}
                                        value={toTime}
                                        onChange={handleToTimeChange}
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
                                        onClick={applyTimeFilter}
                                        _hover={{ color: "white", bg: "primary", border: "1px solid white" }}
                                        value={true}
                                        mr={2}
                                    >
                                        Done
                                    </Button>
                                    <Button size="sm" onClick={clearTimeFilter}>
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

    const [fromRating, setFromRating] = useState(1);
    const [toRating, setToRating] = useState("");
    const [filterRating, setFilterRating] = useState(false);
    const [isRatingFilterMenuOpen, setIsRatingFilterMenuOpen] = useState(false);

    const handleFromRatingChange = (value) => {
        setFromRating(value);
    };

    const handleToRatingChange = (value) => {
        setToRating(value);
    };

    const applyRatingFilter = () => {
        setFilterRating(true);
        console.log(`Filtering rating from ${fromRating} to ${toRating}`);
        closeRatingFilterMenu();
    };

    const clearRatingFilter = () => {
        setFromRating("");
        setToRating("");
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
                {(fromRating && toRating && filterRating) ? (
                    <FilterChip
                        label={`Rating: ${fromRating || ""} - ${toRating || ""}`}
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
                                        value={fromRating}
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
                                        min={fromRating}
                                        value={toRating}
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

    const clocks = [
        { id: 1, name: "Tunde Aregbesola", gender: "Male", time: "10:20.40", age: 12 },
        { id: 2, name: "Grace Bimbo", gender: "Female", time: "10:20.40", age: 12 },
        { id: 3, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 4, name: "Taye Gbenga", gender: "Male", time: "10:20.40", age: 12 },
        { id: 5, name: "Kehinde Gbenga", gender: "Male", time: "10:20.40", age: 12 },
        { id: 6, name: "Pamilerin Aje", gender: "Female", time: "10:20.40", age: 12 },
        { id: 7, name: "James Lukumon", gender: "Male", time: "10:20.40", age: 12 },
        { id: 8, name: "Isaac Philip", gender: "Male", time: "10:20.40", age: 12 },
        { id: 9, name: "Niniola Stephen", gender: "Female", time: "10:20.40", age: 12 },
        { id: 10, name: "Hanna Grace", gender: "Male", time: "10:20.40 ", age: 12 },
        { id: 11, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 12, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 13, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 14, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 15, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 16, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 17, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 18, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 19, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 20, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 21, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 22, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 23, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 24, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 25, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 26, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 27, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 28, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 29, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 30, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 31, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 32, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 33, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 34, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 35, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 36, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 37, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
        { id: 38, name: "Hanna Grace", gender: "Male", time: "10:20.40", age: 12 },
    ];
    // Calculate the total number of pages
    const totalPages = Math.ceil(clocks.length / pageSize);

    // Calculate the index of the first and last item on the current page
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;

    // Get the items for the current page
    const currentItems = clocks.slice(indexOfFirstItem, indexOfLastItem);

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
        clearTimeFilter();
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
            const allRowIds = clocks.map((clock) => clock.id);
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
                        <GenderFilter /><AgeFilter /><TimeFilter /><RatingFilter />
                        {(toAge && fromAge) || (fromRating && toRating) || (fromTime && toTime) || gender ? (
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

                <TableContainer>
                    <Table variant="simple" border="0.5 solid #C3C3C3" color="dark">
                        <Thead mt="30vh"
                            top={0}
                            bg="white"
                            zIndex={1}
                            width="100%"
                            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)">
                            <Tr>
                                <Td>
                                    <Checkbox isChecked={selectAll} onChange={handleSelectAll} />
                                </Td>
                                <Th fontSize="16px">Name</Th>
                                <Th fontSize="16px">Gender</Th>
                                <Th fontSize="16px">Rating</Th>
                                <Th isNumeric fontSize="16px">
                                    Time In
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody fontWeight="light">
                            {currentItems.map((clock) => (
                                <Tr key={clock.id}>
                                    <Td>
                                        <Checkbox
                                            isChecked={selectedRows.includes(clock.id)}
                                            onChange={() => handleRowSelection(clock.id)}
                                        />
                                    </Td>
                                    <Td>{clock.name}</Td>
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
                                    <Td isNumeric>{clock.time}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Td colSpan={5}>
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
            >
                {label}
            </Button>
            <CloseButton size="sm" onClick={onDelete} />
        </Flex>
    );
};


