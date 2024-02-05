import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Queue = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const { venueId: userParam } = useParams();

  const handleGenerateQRCode = async () => {
    localStorage.setItem("venueId", JSON.stringify(userParam));
    setShowQRCode(true);
  };
  //   const baseUrl = process.env.NODE_ENV === 'production' ? 'https://example.com' : 'http://localhost:3000';

  return (
    <div>
      {/* Button to generate QR code */}
      <Button colorScheme="teal" onClick={handleGenerateQRCode}>
        Generate QR Code
      </Button>

      {/* Display QR code if generated */}
      {/* {showQRCode && (
        <QRCode value={`${baseUrl}/venue/${userParam}/join-queue`} />
      )} */}
      {showQRCode && (
        <QRCode value={`http://localhost:3000/venue/${userParam}/join-queue`} />
      )}
      {/* {showQRCode && <QRCode value={`venue/${userParam}/join-queue`} />} */}

      <br></br>
      <br></br>
      {Auth.loggedIn() && (
        <Link to="/venue/${userParam}/live-queue">
          <Button colorScheme="teal">Live Queue</Button>
        </Link>
      )}

      <br></br>
      {/* Make shift button to test out join queue form */}
      {Auth.loggedIn() && (
        <Link to="/venue/${userParam}/join-queue">
          <Button colorScheme="teal">Join Queue</Button>
        </Link>
      )}

      {/* <Link to={`/venue/${user.venue._id}`}></Link> */}
      {/* Make shift button to test out join queue success page */}
      {Auth.loggedIn() && (
        <Link to="/join-queue-success">
          <Button colorScheme="teal">Join Queue Success</Button>
        </Link>
      )}
    </div>
  );
};

export default Queue;
