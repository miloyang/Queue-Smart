import React, { useState } from "react";
import { Box, Heading, Text, Button, Spinner } from "@chakra-ui/react";

const LiveQueue = () => {
  const [queuedEntries, setQueuedEntries] = useState([]);

  // Function to send a text message to the customer
  const sendTextMessage = (customerMobile) => {
    // Implement Twilio integration here to send the text message
    console.log(`Sending text message to ${customerMobile}`);
  };

  // Function to remove the customer from the queue
  const removeCustomerFromQueue = (index) => {
    const updatedQueue = [...queuedEntries];
    updatedQueue.splice(index, 1);
    setQueuedEntries(updatedQueue);
  };

  return (
    <Box maxW="md" mx="auto" mt="8" p="4">
      <Heading as="h2" size="lg" mb="4">
        Live Queue
      </Heading>
      {queuedEntries.length === 0 ? (
        <Text>No entries in the queue yet.</Text>
      ) : (
        queuedEntries.map((entry, index) => (
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
              onClick={() => removeCustomerFromQueue(index)}
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
