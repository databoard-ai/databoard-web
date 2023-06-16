import React, { useState,useEffect } from "react";
import { Box, Flex, Input, InputGroup, Icon, Button, Text, SimpleGrid,useToast ,  Menu, MenuButton, MenuList, MenuItem,Divider} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { BiQrScan, BiDotsVertical,BiBookOpen } from "react-icons/bi";
import { FaInfinity } from "react-icons/fa";
import { IoPulseOutline } from "react-icons/io5";
import { AiOutlineDelete,AiOutlinePrinter,AiOutlineCheckSquare,AiTwotoneEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";

export const Taglist = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://databoard-1-p3241077.deta.app/tags/fetch_all');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toast = useToast()

  const TagComponent = ({ tag }) => {
    const { id, owner_id, type, expiry_date,title } = tag;
    const [isMenuOpen, setMenuOpen] = useState(false);
  
    const handleMenuToggle = () => {
      setMenuOpen(!isMenuOpen);
    };
  
    const handleMenuClose = () => {
      setMenuOpen(false);
    };
  
    return (
      <Link to="/tagdetails">
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
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Icon as={BiQrScan} boxSize={{base:16, sm:28}} color="#4283E4" />
  
          {type === "infinite" ? (
            <Icon as={FaInfinity} boxSize={5} color="#4283E4" my="2" />
          ) : (
            <Icon as={IoPulseOutline} boxSize={5} color="#1E1E1E" my="2" />
          )}
  
          <Text color="#121212" fontSize={{base:"12px", sm:"14px"}} textAlign="center">
            {title}
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
            <MenuItem _hover={{ bg: "gray.100" }} icon={<AiOutlineDelete  />} px="2" my="1">
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      </Link>
    );
  };

  const tags = [
    { id: 1, owner_id: "123", type: "finite", expiry_date: "2023-12-31", title: "Agrotech Seminar" },
    { id: 2, owner_id: "456", type: "infinite", expiry_date: "N/A", title: "Agrotech Seminar" },
    { id: 3, owner_id: "789", type: "finite", expiry_date: "2023-09-15", title: "Agrotech Seminar" },
    { id: 4, owner_id: "101", type: "infinite", expiry_date: "N/A", title: "Agrotech Seminar" },
    { id: 5, owner_id: "112", type: "finite", expiry_date: "2024-05-31", title: "Agrotech Seminar" },
    { id: 6, owner_id: "131", type: "infinite", expiry_date: "N/A", title: "Agrotech Seminar" },
    { id: 7, owner_id: "415", type: "finite", expiry_date: "2023-11-30", title: "Agrotech Seminar" },
    { id: 8, owner_id: "161", type: "infinite", expiry_date: "N/A", title: "Agrotech Seminar" },
    { id: 9, owner_id: "718", type: "finite", expiry_date: "2024-02-28", title: "Agrotech Seminar" },
    { id: 10, owner_id: "919", type: "infinite", expiry_date: "N/A", title: "Agrotech Seminar" },
    { id: 11, owner_id: "789", type: "finite", expiry_date: "2023-09-15", title: "Agrotech Seminar" },
    { id: 12, owner_id: "101", type: "infinite", expiry_date: "N/A", title: "Agrotech Seminar" },
    { id: 13, owner_id: "112", type: "finite", expiry_date: "2024-05-31", title: "Agrotech Seminar" },
    { id: 14, owner_id: "131", type: "infinite", expiry_date: "N/A", title: "Agrotech Seminar" },
    { id: 15, owner_id: "415", type: "finite", expiry_date: "2023-11-30", title: "Agrotech Seminar" },
    { id: 16, owner_id: "161", type: "infinite", expiry_date: "N/A", title: "Agrotech Seminar" },
    { id: 17, owner_id: "718", type: "finite", expiry_date: "2024-02-28", title: "Agrotech Seminar" },
    { id: 18, owner_id: "919", type: "infinite", expiry_date: "N/A", title: "Agrotech Seminar" },
  ];
  return (
    <Flex width="full" direction="column">
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
      <Box ml="10px" mt={{base:"0.5em", sm:"0.7em"}}>
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
              width={{base:"60vw",sm:"full"}}
              height="40px"
              textAlign="left"
            />
          </InputGroup>
        </Flex>
      </Box>
      <Box height="90vh" bg="#FEFEFE" display="flex" alignItems="" justifyContent="flex-start" p="1em" flexDirection="column">
        <SimpleGrid p={{ base: "8px", sm: "12px" }} spacing={10} minChildWidth={{ base: "8em", sm: "13em", md: "13em", lg: "13em" }}>
          {tags.map((tag) => (
            <TagComponent key={tag.id} tag={tag}  />
          ))}
        </SimpleGrid>
      </Box>
      <Link to='/create-tag'>
      <Button
        position="fixed"
        bottom="8"
        right="4"
        mx="10"
        width="200px"
        as="button"
        onClick={()=>toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })}
       
      >
        <Flex direction="row">
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
            _focusWithin={{bg: "#3672c2"}}
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
            _focusWithin={{bg: "#3672c2"}}
            _hover={{ bg: "primary" }}
          >
            <Text color="white" fontSize="0.8em" fontWeight="400">
              Create new tag
            </Text>
          </Button>
        </Flex>
      </Button>
      </Link>

    </Flex>
  );
};