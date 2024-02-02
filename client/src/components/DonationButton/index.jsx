import React from "react";
import { Button } from "@chakra-ui/react";

const DonationButton = () => {
  const handleDonateClick = () => {
    // Handle click event, such as opening a donation page
    window.location.href = "/donate"; // Redirect to the donation page
  };

  return (
    <Button
      colorScheme="blue"
      size="lg"
      onClick={handleDonateClick}
      style={{ margin: "15px" }}
    >
      Donate Now
    </Button>
  );
};

export default DonationButton;
