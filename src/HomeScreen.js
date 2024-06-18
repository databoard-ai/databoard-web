import { Box, Text, Flex, Image, Button } from "@chakra-ui/react";
import React from "react";
import Navbar from "./components/navbar";
import image1 from "./assets/man-wearing-vr-headset-outdoor-futuristic-technology 2.svg";
import laptop from './assets/laptop.svg'
import about from './assets/about.svg'
import Footer from "./components/Footer";
import { NavLink } from "react-router-dom";


function HomeScreen() {
  return (
    <Box>
      <Navbar />
      <Flex 
      width={{base:'100%', md:'70%'}}
      margin={'auto'}
      marginTop={"100px"} 
      >
        <Box width={"50%"} padding={"20px"}>
          <Text fontWeight={"bold"} className="text-3xl  ">
            Empowering Access in a Data-driven world
          </Text>
          <Text 
          className="text-sm mt-4  ">
            Optimise performance and establish peak efficiency with Databoard.
            Let us help you get more out of your visitors without breaching
            privacy
          </Text>
          <Button
            bgColor="#4278E4"
            px={{ base: "10%", md: "15%" }}
            py="1.7em"
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight="normal"
            display={"flex"}
            mt={7}
            textColor={"white"}
            borderRadius={4}
            _hover={{ textDecoration: "underline", bgColor: "#4278E4" }}
          >
            Get Started
          </Button>
        </Box>
        <Box width={"50%"} justifyContent={"center"}>
          <Image margin={"auto"} width={"80%"} src={image1} />
        </Box>
      </Flex>
      <Flex
       width={{base:'100%', md:'70%'}}
       margin={'auto'}
       marginTop={"100px"} 
      >
        <Box width={"50%"}>
          <Image margin={"auto"} width={"90%"} src={laptop} />
        </Box>

        <Box width={"50%"} padding={"10px"}>
          <Text fontWeight={"bold"} className="text-3xl  ">
          Meet Clocker
          </Text>
          <Text className="text-sm w-[95%] ">
          Clocker redefines access control and subscription management for your event, location or business. Seamlessly acquire and handle guest data, offering 
          {" "}
          <b>frictionless sign-ins without a mobile app.</b>
          </Text>
          <NavLink to={'https://clocker.databoard.ai/'}>
          <Button
            bgColor="#FF4D00;"
            px={{ base: "10%", md: "15%" }}
            py="1.7em"
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight="normal"
            display={"flex"}
            mt={3}
            textColor={"white"}
            borderRadius={4}
            _hover={{ textDecoration: "underline" }}
          >
             Meet Clocker
          </Button>
          </NavLink>
        </Box>
      </Flex>
      <Image src = {about} />
      <Footer/>
    </Box>
  );
}

export default HomeScreen;
