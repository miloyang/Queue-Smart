import React from 'react';
import { useLocation } from 'react-router-dom';

const JoinQueueSuccess = () => {
  const location = useLocation();
  const { message } = location.state || { message: "You have successfully joined the digital Queue! We will notify you once you're the first in line." };

  return (
    <div>
      <h2>Success!</h2>
      <p>{message}</p>
    </div>
  );
};

export default JoinQueueSuccess;
