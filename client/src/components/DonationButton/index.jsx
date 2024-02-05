import React from "react";
import { Button } from "@chakra-ui/react";

const DonationButton = () => {
  const handleDonateClick = () => {
    // Handle click event to open the donation page 
    window.open("https://donate.stripe.com/test_7sI01o9c7aGj5YkeUU", "_blank"); // Redirect to the donation page
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
