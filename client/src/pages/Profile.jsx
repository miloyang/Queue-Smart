import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import AddVenue from "./AddVenue"; // Import AddVenue component
import VenueForm from '../components/VenueForm';
import { Button } from "@chakra-ui/react";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();
  console.log(userParam);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  const [showAddVenue, setShowAddVenue] = useState(false);

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
      </div>
<div>
      {!userParam && (
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          {/* Conditionally render Add Venue button */}
          {Auth.loggedIn() && Auth.getProfile().data.username === userParam ? (
            <Button onClick={() => setShowAddVenue(true)}>Add Venue</Button>
          ) : null }

          {/* Conditionally render AddVenue component */}
          {showAddVenue && <AddVenue />}

          {/* Display existing venues */}
          {user?.venues?.length > 0 && (
            <div>
              <h3>Existing Venues</h3>
              <ul>
                {user.venues.map((venue, index) => (
                  <li key={index}>{venue.venueName}</li>
                ))}
              </ul>
            </div>
          )}

          {/* <VenueForm /> */}
        </div>
      )}
      </div>
    </div>
  );
};

export default Profile;
