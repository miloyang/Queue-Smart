import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_VENUE } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
  } from "@chakra-ui/react";

const AddVenue = () => {
//   const [venueName, setVenueName] = useState("");
const navigate = useNavigate(); // Initialize useHistory
  const [formState, setFormState] = useState({
    venueName: "",
  });
  const [addVenue, { error, data }] = useMutation(ADD_VENUE);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
        ...formState,
        [name]: value,
    });
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(formState);

  //   try {
  //       const { data } = await addVenue({
  //           variables: { ...formState },
  //       });

  //       Auth.login(data.addVenue.token);
  //   } catch (e) {
  //       console.error(e);
  //   }
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Execute the ADD_VENUE mutation
      await addVenue({ variables: { venueName: formState.venueName } });
      navigate("/me"); // Redirect to the profile page after submission
      // {user.venue && (
      //   <div>
      //     <h2>Venue:</h2>
      //     <p>{user.venue}</p>
      //   </div>
      // )}
      // Clear the input field after successful submission
      // setVenueName("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box justifyContent="center" alignItems="center" mt={4} mb={4}>
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
          </form>
        
        {error && (
          <Text color="red.500" mb={4}>
            {error.message}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default AddVenue;
