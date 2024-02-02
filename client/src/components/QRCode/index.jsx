import React from "react";
import QRCode from "react-qr-code";

const QRCodeComponent = ({ venueId }) => {
  // Construct the value for the QR code using the venueId
  const qrCodeValue = `Venue ID: ${venueId}`;

  return (
    <div id="Container">
      <h2>QR Code for Your Venue</h2>
      <QRCode value={qrCodeValue} />
    </div>
  );
};

export default QRCodeComponent;
