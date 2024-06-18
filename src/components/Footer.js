import {   
    Box,
    Flex,
    HStack,
    Icon,
    Image,
    Stack,
    Text,
    VStack,} from '@chakra-ui/react';
import logo from '../assets/DataboardLogo.svg';
import {FaFacebook, FaInstagram , FaLinkedin} from 'react-icons/fa'

import { NavLink } from "react-router-dom";


import React from 'react';



function Footer() {
  return (
    <Box
      h={{ base: "auto", md: "auto" }}
      className="footer"
      py={{ base: "2em", md: "3em" }}
      px={{ base: "1em", md: "em" }}
    >
          <Stack
        direction={{ base: "column", md: "row" }}
        // alignItems="center"
        justifyContent="space-between"
        gap={{ base: "2em", md: "6em" }}
        px={{ base: "0", md: "em" }}
        bgColor="#"
        w="100%"
      >
        <Flex
          // alignItems={{ base: "center", md: "left" }}
          // justifyContent="center"
          direction={{ base: "column", md: "column" }}
          bgColor="#"
          gap={{ base: "6", md: "5" }}
          flex=".3"
        >
          <VStack
            w="fit-content"
            // display="flex"
            justifyContent={{ base: "start", md: "start" }}
          >
           <Image 
         marginRight={'auto'}
         src={logo} />
          <Box
              position={'relative'}
              width={{ base: '100%', md: '260px' }}
            >
              <Text
                textAlign={'start'}
                className='text-sm lg:text-[13px]  text-start'
              >
                Our job is simple; connecting you with your audience
              </Text>
            </Box>
          </VStack>
          <HStack gap="10">
          <NavLink to="https://twitter.com/databoard_ai">
            <Icon
              as={FaFacebook}
              w={6}
              h={6}
              my={{ base: "1.5", md: "0em" }}
              color = "#FF4D00"
            />
          </NavLink>
            <NavLink to="https://www.instagram.com/clocker.app">
              <Icon
                as={FaInstagram}
                w={6}
                h={6}
                my={{ base: "1.5", md: "0em" }}
                color = "#FF4D00"
              />
            </NavLink>
            {/* <NavLink to="https://twitter.com/databoard_ai">
              <Icon

                as={FaXTwitter}
                w={6}
                h={6}
                my={{ base: "1.5", md: "0em" }}
              color = "#FF4D00"
              />
            </NavLink> */}
            <NavLink to="https://twitter.com/databoard_ai">
            
            <Icon
            
              as={FaLinkedin}
              w={6}
              h={6}
              my={{ base: "1.5", md: "0em" }}
              color = "#FF4D00"
            />
            </NavLink>
          </HStack>
          {/* <Spacer py="1em" /> */}
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: "4", md: "20" }}
        >
          <VStack
            // gap="1"
            display="flex"
            alignItems={{ base: "start", md: "end" }}
          >
            <Text
              fontSize={{ base: "md", md: "md" }}
              fontWeight="bolder"
              _hover={{ textDecoration: "underline" }}
              my={{ base: "1.5", md: "0em" }}
            >
              <NavLink to='https://clocker.databoard.ai/about_us'>

              About us
              </NavLink>
            </Text>
          </VStack>
          <VStack
            // gap="1"
            display="flex"
            alignItems={{ base: "start", md: "end" }}
          >
            <Text
              fontSize={{ base: "md", md: "md" }}
              fontWeight="bolder"
              _hover={{ textDecoration: "underline" }}
              my={{ base: "1.5", md: "0em" }}
            >
              <NavLink to='/career'>
                Career
              </NavLink>
            </Text>
          </VStack>
          <VStack
            // gap="0"
            display="flex"
            alignItems={{ base: "start", md: "end" }}
          >
            <Text
              fontSize={{ base: "md", md: "md" }}
              fontWeight="bolder"
              _hover={{ textDecoration: "underline" }}
              my={{ base: "1.5", md: "0em" }}
            >
              <NavLink to='/pricing'>
              Pricing
              </NavLink>
            </Text>
          </VStack>
          <VStack
            gap="1"
            display="flex"
            alignItems={{ base: "start", md: "end" }}
          >
            <Text
              fontSize={{ base: "md", md: "md" }}
              fontWeight="bolder"
              _hover={{ textDecoration: "underline" }}
              my={{ base: "1.5", md: "0em" }}
            >
              <NavLink to='/terms-of-service'>
              Terms of Service
              </NavLink>
            </Text>
          </VStack>
          <VStack
            gap="1"
            display="flex"
            alignItems={{ base: "start", md: "end" }}
          >
            <Flex
            flexDir={"column"}
            >
            <Text
              fontSize={{ base: "md", md: "md" }}
              fontWeight="bolder"
              _hover={{ textDecoration: "underline" }}
              my={{ base: "1.5", md: "0em" }}
              textAlign={"start"}
              
            >
              <NavLink to='/privacy'>
              Privacy
              </NavLink>

            </Text>
            </Flex>
          </VStack>
          <VStack
            gap="1"
            display="flex"
            alignItems={{ base: "start", md: "start" }}
          >
            <Text
              fontSize={{ base: "md", md: "md" }}
              fontWeight="bolder"
              _hover={{ textDecoration: "underline" }}
              my={{ base: "1.5", md: "0em" }}
            >
              <NavLink to='#'>
              Get in Touch
              </NavLink>
            </Text>
                 <ul className=" mt-[15px] md:mt-[10px] sm:items-start md:items-start  text-md font-medium">
               <li>
                <a className="underline font-bold">info@databoard.ai</a>
              </li>
            </ul>
          </VStack>
        </Flex>
      </Stack>
    </Box>
  )
}

export default Footer
