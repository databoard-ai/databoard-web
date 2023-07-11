import React, { useState } from "react";
import { Box, Flex, Text, Icon, Menu, MenuButton, MenuList, MenuItem,Divider } from "@chakra-ui/react";
import { BiQrScan, BiDotsVertical,BiBookOpen } from "react-icons/bi";
import { FaInfinity } from "react-icons/fa";
import { IoPulseOutline } from "react-icons/io5";
import { AiOutlineDelete,AiOutlinePrinter,AiOutlineCheckSquare,AiTwotoneEdit } from "react-icons/ai";

export default TagComponent = ({ tag }) => {
  const { id, owner_id, type, expiry_date,title } = tag;
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
  );
};