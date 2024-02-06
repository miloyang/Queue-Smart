import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
// import signup  from './Signup';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Flex
      justifyContent="center"
      mt={4}
      mb={4}
      alignItems="center"
      //   minH="100vh"
      //   width="100%"
      //   bg="gray.100"
    >
      <Box
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        width="100%"
        maxWidth="400px"
        textAlign="center"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Login
        </Text>
        {data ? (
          <Text mb={4}>
            Success! You may now head{" "}
            <ChakraLink to="/" color="teal.500">
              back to the homepage.
            </ChakraLink>
          </Text>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <FormControl mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button colorScheme="teal" type="submit" width="full" mb={4}>
              Login
            </Button>
          </form>
        )}

        {error && (
          <Text color="red.500" mb={4}>
            {error.message}
          </Text>
        )}

        <Text mb={4}>
          Don&apos;t have an account?{" "}
          <ChakraLink as={Link} to="/signup" color="teal.500">
            Sign up here
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
