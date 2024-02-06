import { useLocation, useNavigate } from "react-router-dom";
import DonationButton from "../DonationButton/index";
import { Button } from "@chakra-ui/react";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer
      className="w-100 mt-auto bg-secondary p-4"
      style={{ marginTop: "65px" }}
    >
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <Button
            className="btn btn-dark mb-3"
            variant="outline"
            colorScheme="white"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </Button>
        )}
        <h4 style={{ marginTop: "15px" }}>
          This is a free service but we appreciate any support to help us
          sustain and improve.
        </h4>
        <h4>Your donation, no matter the amount, makes a difference!</h4>
        <DonationButton />
        <h4>
          This service was built by{" "}
          <a href="https://www.linkedin.com/in/miloyang/" target="new">
            Milo Yang
          </a>{" "}
          with{" "}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{" "}
          to simplify queues and enhance waiting experiences for all.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
