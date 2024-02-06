import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { Box, Flex, Link as ChakraLink, Button, Text } from "@chakra-ui/react";

const Header = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate("/");
  };

  // console.log(Auth.getProfile());
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
            <Box mb={4}>
              <ChakraLink
                as={Link}
                to="/me"
                mr={4}
                color="teal"
                fontSize="lg"
                _hover={{ textDecoration: "underline" }}
                _focus={{ outline: "none", boxShadow: "outline" }}
                _active={{ color: "teal.500" }}
              >
                {Auth.getProfile().data.username}'s profile
              </ChakraLink>
              <Button onClick={logout} variant="outline" colorScheme="white">
                Logout
              </Button>
            </Box>
          ) : (
            <div>
              <ChakraLink
                as={Link}
                to="/login"
                mr={4}
                fontSize="xl"
                color="skyblue"
              >
                Login
              </ChakraLink>
              <ChakraLink as={Link} to="/signup" fontSize="xl" color="pink">
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
