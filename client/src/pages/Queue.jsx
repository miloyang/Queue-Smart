import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

const Queue = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  //   const [createQRCode] = useMutation(CREATE_QR_CODE);
  const { venueId: userParam } = useParams();

  const handleGenerateQRCode = async () => {
    // try {
    //   // Call the mutation to create a QR code with the venueId
    //   const { data } = await createQRCode({
    //     variables: { venueId }
    //   });
    setShowQRCode(true);
    // } catch (error) {
    //   console.error('Error generating QR code:', error);
    // }
  };

  return (
    <div>
      {/* Button to generate QR code */}
      <Button colorScheme="teal" onClick={handleGenerateQRCode}>
        Generate QR Code
      </Button>
      {/* Display QR code if generated */}
      {/* {showQRCode && <QRCode value={`Venue ID: ${userParam}`} />} */}
      {showQRCode && (
        <QRCode value={`http://localhost:3000/venue/${userParam}/join-queue`} />
      )}
      {/* {showQRCode && <QRCode value={`venue/${userParam}/join-queue`} />} */}
      <br></br>
      <br></br>
      <Link to="/venue/${userParam}/live-queue">
        <Button colorScheme="teal">Live Queue</Button>
      </Link>
      <br></br>
      {/* Make shift button to test out join queue form */}
      <Link to="/venue/:venueId/join-queue">
        <Button colorScheme="teal">Join Queue</Button>
      </Link>
      {/* Make shift button to test out join queue success page */}
      <Link to="/join-queue-success">
        <Button colorScheme="teal">Join Queue Success</Button>
      </Link>
    </div>
  );
};

export default Queue;
