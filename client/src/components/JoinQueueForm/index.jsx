import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinQueueForm = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [partySize, setPartySize] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the API to add the customer to the queue
    try {
      // Assume an API call to add the customer to the queue
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: customerName,
          mobile: customerMobile,
          partySize: parseInt(partySize),
        }),
      });

      if (response.ok) {
        // If the API call is successful, navigate to the queue display page
        navigate('/join-queue-success');
      } else {
        throw new Error('Failed to join the queue');
      }
    } catch (error) {
      console.error('Error joining queue:', error);
      // Handle error, show an alert, or set an error state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="customerName">Your Name:</label>
      <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

      <label htmlFor="customerMobile">Your Mobile:</label>
      <input type="tel" id="customerMobile" value={customerMobile} onChange={(e) => setCustomerMobile(e.target.value)} />

      <label htmlFor="partySize">Party Size:</label>
      <input type="number" id="partySize" value={partySize} onChange={(e) => setPartySize(e.target.value)} />

      <button type="submit">Join Queue</button>
    </form>
  );
};

export default JoinQueueForm;