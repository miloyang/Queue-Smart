// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const QueueDisplay = () => {
//   const [queuePosition, setQueuePosition] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const venue = params.get('venue');

//     // Fetch queue position based on the venue
//   }, [location]);

//   return (
//     <div>
//       {queuePosition ? (
//         <p>Your position in the queue: {queuePosition}</p>
//       ) : (
//         <p>Loading queue position...</p>
//       )}
//     </div>
//   );
// };

// export default QueueDisplay;