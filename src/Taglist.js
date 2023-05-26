import React from "react";
import { Box, Flex, Input, InputGroup, Icon, Button, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { BsFolderPlus } from "react-icons/bs";

export const Taglist = () => {
  return (
    <Flex width="full" direction="column">
      <Box>
        <Flex width="full" px="20px" py="20px" bg="#4283E4" alignItems="flex-end">
          <Flex verticalAlign="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="red.500"
              borderRadius="full"
              width={{ base: "10px", sm: "20px", md: "30px" }}
              height={{ base: "10px", sm: "20px", md: "30px" }}
            >
              <Box fontSize={{ base: "sm", sm: "md", md: "sm" }} fontWeight="bold" color="white">
                AL
              </Box>
            </Box>
            <Box size={{ base: "10px", sm: "20px", md: "20px" }} px="2" verticalAlign="center" pt="1" color="white">
              Abc Light room
            </Box>
          </Flex>
          <InputGroup ml="auto" width="250px">
            <Input
              type="text"
              placeholder="Search..."
              borderRadius="md"
              px="5"
              _focus={{ outline: "2px solid blue", boxShadow: "none" }}
              width="full"
              height="40px"
              pr="40px"
              textAlign="left"
            />
          </InputGroup>
        </Flex>
      </Box>
      <Box height="90vh" bg="#FEFEFE" display="flex" alignItems="center" justifyContent="center">
        <Flex direction="column" alignItems="center">
          <Icon as={BsFolderPlus} boxSize={60} color="#C3C3C3" />
          <Box>
            <Text color="#C3C3C3" fontSize="1.5em" textAlign="center">
              Your first time?
            </Text>
          </Box>
          <Box>
            <Text color="#C3C3C3" fontSize="1.5em" textAlign="center">
              Create a new tag and let's begin
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box
      position="fixed"
      bottom="8"
      right="4"
      mx="10"
      width="200px"
      as="button"
      _hover={{ bg: "#3672c2" }}
      borderRadius="0.5em"
    >
      <Flex direction="row">
        <Button
          px="2em"
          py="1em"
          bg="#4283E4"
          borderTopLeftRadius="0.5em"
          borderBottomLeftRadius="0.5em"
          flex="1"
          // display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={AddIcon} boxSize="2" color="white" />
        </Button>
        <Box bg="#ffff" w="0.2em"></Box>
        <Button
          borderTopRightRadius="0.5em"
          borderBottomRightRadius="0.5em"
          bg="#4283E4"
          px="1em"
          py="1em"
          flex="14"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ bg: "#3672c2" }}
        >
          <Text color="white" fontSize="0.8em">
            Create new tag
          </Text>
        </Button>
      </Flex>
    </Box>

    </Flex>
  );
};