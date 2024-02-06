import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

// Import background image
import backgroundImage from "../assets/home-background.jpg";

const Home = () => {
  return (
    <Box
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box textAlign="center" p={8} backgroundColor="rgba(255,255,255,0.7)">
        <Heading as="h1" size="xl" mb={4}>
          Welcome to Queue-Smart!
        </Heading>
        <Text fontSize="lg" mb={4}>
          Let us help you manage your queues efficiently.
        </Text>
        <Text fontSize="lg" mb={4}>
          Get started by signing up or logging in.
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
