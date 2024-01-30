import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_VENUE } from "../utils/mutations";
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
        const { data } = await addVenue({
            variables: { ...formState },
        });

        Auth.login(data.addVenue.token);
    } catch (e) {
        console.error(e);
    }
  };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // Execute the ADD_VENUE mutation
//       const { data } = await addVenue({
//         variables: { venueName },
//       });

//       console.log(data); 

//       // Clear the input field after successful submission
//       setVenueName("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

  return (
    // <div>
    //   <h2>Add Venue</h2>
    //   {error && <div>Error: {error.message}</div>}
    //   <form onSubmit={handleFormSubmit}>
    //     <div>
    //       <label htmlFor="venueName">Venue Name:</label>
    //       <input
    //         type="text"
    //         id="venueName"
    //         value={venueName}
    //         onChange={(e) => setVenueName(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    
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
