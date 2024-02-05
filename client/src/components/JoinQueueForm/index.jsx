import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useMutation } from '@apollo/client';
import { ADD_QUEUE } from '../../utils/mutations';

const JoinQueueForm = () => {
  const navigate = useNavigate();
  const { venueId: userParam } = useParams(); // Get venueId from URL params
  const [addQueueMutation] = useMutation(ADD_QUEUE);

  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [partySize, setPartySize] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addQueueMutation({
        variables: {
          venueId: JSON.parse(localStorage.getItem('venueId')), // Pass the venueId from URL params
          customerName,
          customerMobile,
          partySize
        }
      });
      console.log('New queue entry added:', data.addQueue);
      navigate("/join-queue-success"); // Navigate after successful submission
    } catch (error) {
      console.error('Error adding queue entry:', error);
    }
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
