import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { Box, Flex, Link as ChakraLink, Button, Text } from "@chakra-ui/react";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div
      bg="primary.500"
      color="white"
      px={4}
      py={2}
      textAlign="center"
      width="100%"
      position="fixed"
      top={0}
      zIndex={1}
    >
      <div align="center" justify="space-between" maxWidth="1200px" mx="auto">
        <div align="center">
          <ChakraLink as={Link} to="/" mr={4}>
            <Text fontSize="4xl" fontWeight="bold">
              Queue-Smart
            </Text>
          </ChakraLink>
          <Text fontSize="2xl" mt={-3} mb={2}>
            Give your customers the flexibility to skip physical queues.
          </Text>
        </div>
        <div align="center">
          {Auth.loggedIn() ? (
            <>
              <ChakraLink as={Link} to="/me" mr={4}>
                {Auth.getProfile().data.username}'s profile
              </ChakraLink>
              <Button onClick={logout} variant="outline" colorScheme="white">
                Logout
              </Button>
            </>
          ) : (
            <div>
              <ChakraLink as={Link} to="/login" mr={4} fontSize="xl" color="skyblue">
                Login
              </ChakraLink>
              <ChakraLink as={Link} to="/signup" fontSize="xl" color="lightgreen">
                Signup
              </ChakraLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
