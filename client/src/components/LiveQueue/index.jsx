import React, { useState } from "react";
import { Box, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { REMOVE_QUEUE } from '../../utils/mutations';

const LiveQueue = () => {
  const [queuedEntries, setQueuedEntries] = useState([]);
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const user = data?.me.venue.queues || data?.user || {};
  console.log(user);

  const [removeQueue, { error }] = useMutation(REMOVE_QUEUE);

  // Function to send a text message to the customer
  const sendTextMessage = (customerMobile) => {
    // Implement Twilio integration here to send the text message
    console.log(`Sending text message to ${customerMobile}`);
  };

  // Function to remove the customer from the queue
  const removeCustomerFromQueue = async (index) => {
let queueId = index;
    try {
      const { data } = await removeQueue({
        variables: { venueId:JSON.parse(localStorage.getItem('venueId')), queueId }
      });

    } catch (e) {
      console.error(e);
    }
    // const updatedQueue = [...queuedEntries];
    // updatedQueue.splice(index, 1);
    // setQueuedEntries(updatedQueue);
  };

  return (
    <Box maxW="md" mx="auto" mt="8" p="4">
      <Heading as="h2" size="lg" mb="4">
        Live Queue
      </Heading>
      {user.length === 0 ? (
        <Text>No entries in the queue yet.</Text>
      ) : (
        user.map((entry, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" p="4" mb="4">
            <Text fontSize="lg">Name: {entry.customerName}</Text>
            <Text fontSize="lg">Mobile: {entry.customerMobile}</Text>
            <Text fontSize="lg">Party Size: {entry.partySize}</Text>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => sendTextMessage(entry.customerMobile)}
              mr="2"
            >
              Notify via Text
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => removeCustomerFromQueue(entry._id)}
            >
              Remove from Queue
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default LiveQueue;
