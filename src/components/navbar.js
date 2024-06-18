import React, { useState, useEffect } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { Box, HStack, Text, VStack, IconButton, Image } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import logo from '../assets/DataboardLogo.svg';

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 790);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Flex>
      <Box
        fontFamily="'Clash Display', sans-serif"
        display={'flex'}
        justifyContent={{base:'space-between'}}
        width={'100%'}
        position={'fixed'}
        top={0}
        mb={'200px'}
        fontSize={'19px'}
        bg="white"
        padding={'5px'}
        zIndex={99}
      >
        <Box
           width={{md:'50%'}}
        >
        <NavLink to="/">
          <Image
          margin={{md:'auto'}}
          src={logo} alt="Logo" />
        </NavLink>
        </Box>
        {!isMobile ? (
          <HStack
            // justifyContent={'space-between'}
            width={'fit-content'}
            marginRight={'auto'}
            padding={'5px'}
            fontFamily={'Clash-Display-light'}
          >
            <NavLink to="/">
              <Text
                fontFamily="'Clash Display', sans-serif"
                margin={'5px'}
                _hover={{ cursor: 'pointer', color: '#4283E4' }}
              >
                Home
              </Text>
            </NavLink>
            <NavLink to="/blog">
              <Text
                fontFamily="'Clash Display', sans-serif"
                margin={'5px'}
                _hover={{ cursor: 'pointer', color: '#4283E4' }}
              >
                Blog
              </Text>
            </NavLink>
            <NavLink to="https://clocker.databoard.ai/about_us">
              <Text
                fontFamily="'Clash Display', sans-serif"
                margin={'5px'}
                _hover={{ cursor: 'pointer', color: '#4283E4' }}
              >
                Company
              </Text>
            </NavLink>
            <NavLink to="/contact">
              <Text
                fontFamily="'Clash Display', sans-serif"
                margin={'5px'}
                _hover={{ cursor: 'pointer', color: '#4283E4' }}
              >
                Contact Us
              </Text>
            </NavLink>
          </HStack>
        ) : (
          <Box>
            <Box width={'50px'} m={'auto'}>
              <IconButton
                aria-label="Open Menu"
                colorScheme="transparent"
                color={'black'}
                size="lg"
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                onClick={onToggle}
              />
            </Box>
          </Box>
        )}
      </Box>
      {isOpen && (
        <Box width="100%">
          <VStack
            textAlign={'center'}
            color="#000"
            position="fixed"
            mt="2em"
            pt="1.5em"
            top="36px"
            right="0"
            width="100%"
            zIndex={99}
            bg="white"
            boxShadow="md"
            marginTop={'10px'}
            fontSize={'20px'}
            pb={'1em'}
          >
            <NavLink to="/">
              <Text
                _hover={{ cursor: 'pointer', color: '#4283E4' }}
              >
                Home
              </Text>
            </NavLink>
            <NavLink to="/blog">
              <Text
                _hover={{ cursor: 'pointer', color: '#4283E4' }}
              >
                Blog
              </Text>
            </NavLink>
            <NavLink to="https://clocker.databoard.ai/about_us">
              <Text
                _hover={{ cursor: 'pointer', color: '#4283E4' }}
              >
                Company
              </Text>
            </NavLink>
            <NavLink to="/contact">
              <Text
                _hover={{ cursor: 'pointer', color: '#4283E4' }}
              >
                Contact Us
              </Text>
            </NavLink>
          </VStack>
        </Box>
      )}
    </Flex>
  );
}

export default Navbar;
