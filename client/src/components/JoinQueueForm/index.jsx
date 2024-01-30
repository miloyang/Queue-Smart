import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const JoinQueueForm = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the API to add the customer to the queue
    // ...

    history.push('/queue');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="phone">Phone:</label>
      <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

      <label htmlFor="people">Number of people:</label>
      <input type="number" id="people" value={people} onChange={(e) => setPeople(e.target.value)} />

      <button type="submit">Join Queue</button>
    </form>
  );
};

export default JoinQueueForm;