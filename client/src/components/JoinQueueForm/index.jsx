import React, { useState } from "react";
// import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

// const JoinQueueForm = ({ addNewEntryToQueue }) => {
  const JoinQueueForm = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [partySize, setPartySize] = useState(1);
  // const { venueId: userParam } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new entry object with the form data
    // const newEntry = {
    //   customerName,
    //   customerMobile,
    //   partySize,
    // };
    // // Pass the new entry to the parent component to add it to the queue
    // addNewEntryToQueue(newEntry);
    // // Reset the form fields after submission
    // setCustomerName("");
    // setCustomerMobile("");
    // setPartySize("");

    navigate("/join-queue-success");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="customerName">Your Name:</FormLabel>
          <Input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="customerMobile">Your Mobile:</FormLabel>
          <Input
            type="tel"
            id="customerMobile"
            value={customerMobile}
            onChange={(e) => setCustomerMobile(e.target.value)}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="partySize">Party Size:</FormLabel>
          <Input
            type="number"
            id="partySize"
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
            required
          />
        </FormControl>

        <Button type="submit" colorScheme="teal">
          Join Queue
        </Button>
      </Stack>
    </form>
  );
};

export default JoinQueueForm;
