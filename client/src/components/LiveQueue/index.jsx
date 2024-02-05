import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_VENUE } from '../../utils/queries';
import { ADD_QUEUE, REMOVE_QUEUE } from '../../utils/mutations';
import { Button } from '@chakra-ui/react';
import QRCode from 'react-qr-code';

const LiveQueue = () => {
  const { venueId } = useParams();
  const { loading, data } = useQuery(QUERY_VENUE, {
    variables: { venueId }
  });
  const [addQueue] = useMutation(ADD_QUEUE);
  // const [sendText] = useMutation(SEND_TEXT);
  const [removeQueue] = useMutation(REMOVE_QUEUE);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [queue, setQueue] = useState([]);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    if (data && data.venue) {
      setQueue(data.venue.queue);
    }
  }, [data]);

  const handleAddToQueue = async () => {
    try {
      const { data } = await addQueue({
        variables: { venueId, customerName, customerMobile, partySize }
      });
      setQueue([...queue, data.addQueue]);
      setCustomerName('');
      setCustomerMobile('');
      setPartySize(1);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSendText = async (customerId) => {
  //   try {
  //     await sendText({
  //       variables: { customerId }
  //     });
  //     // Logic to update UI indicating text sent
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleRemoveFromQueue = async (customerId) => {
    try {
      await removeQueue({
        variables: { venueId, customerId }
      });
      setQueue(queue.filter((customer) => customer._id !== customerId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateQRCode = () => {
    setShowQRCode(true);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Live Queue</h2>
          <div>
            {queue.map((customer) => (
              <div key={customer._id}>
                <p>Name: {customer.customerName}</p>
                <p>Mobile: {customer.customerMobile}</p>
                <p>Party Size: {customer.partySize}</p>
                <Button colorScheme="teal" onClick={() => handleSendText(customer._id)}>Text Customer</Button>
                <Button colorScheme="red" onClick={() => handleRemoveFromQueue(customer._id)}>Remove Customer</Button>
              </div>
            ))}
          </div>
          <form onSubmit={handleAddToQueue}>
            <label htmlFor="customerName">Name:</label>
            <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            <label htmlFor="customerMobile">Mobile:</label>
            <input type="tel" id="customerMobile" value={customerMobile} onChange={(e) => setCustomerMobile(e.target.value)} />
            <label htmlFor="partySize">Party Size:</label>
            <input type="number" id="partySize" value={partySize} onChange={(e) => setPartySize(e.target.value)} />
            <button type="submit">Join Queue</button>
          </form>
          {/* Button to generate QR code */}
          <Button colorScheme="teal" onClick={handleGenerateQRCode}>
            Generate QR Code
          </Button>
          {/* Display QR code if generated */}
          {showQRCode && <QRCode value={`Venue ID: ${venueId}`} />}
        </div>
      )}
    </div>
  );
};

export default LiveQueue;
