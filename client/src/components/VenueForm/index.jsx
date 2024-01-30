import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_VENUE } from "../../utils/mutations";
import { QUERY_VENUE, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

const VenueForm = () => {
  const [venueName, setVenueName] = useState("");

  const [addVenue, { error }] = useMutation(ADD_VENUE, {
    refetchQueries: [QUERY_VENUE, "venue", QUERY_ME, "me"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addVenue({
        variables: {
          venueName,
        },
      });

      setVenueName("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "venueName" && value.length >= 1) {
      setVenueName(value);
    }
  };

  return (
    <Box justifyContent="center" alignItems="center" mt={4} mb={4}>
      {Auth.loggedIn() ? (
        <Box 
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        width="100%"
        maxWidth="600px"
        >
          <form onSubmit={handleFormSubmit}>
            <FormControl mb={4}>
              <FormLabel htmlFor="venueName">Venue Name</FormLabel>
              <Input
                id="venueName"
                placeholder="Your Venue's Name"
                name="venueName"
                type="text"
                value={formState.name}
                onChange={handleChange}
              />
            </FormControl>
            
            <Button colorScheme="teal" type="submit" width="full" mb={4}>
              Submit
            </Button>
            {error && (
              <Text color="red.500" mb={4}>
                {error.message}
              </Text>
            )}
          </form>
        </Box>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </Box>
  );
};

export default VenueForm;
