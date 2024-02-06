import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_VENUE } from "../utils/mutations";

import { Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const { username: userParam } = useParams();
  // console.log("userParam", userParam);

  useEffect(() => {
    refetch(); // Refetch user data when component mounts or userParam changes
  }, [userParam, refetch]);

  const [removeVenue] = useMutation(REMOVE_VENUE, {
    refetchQueries: [{ query: QUERY_ME }], // Refetch user data after deletion
  });

  // console.log(data);

  const user = data?.me || data?.user || {};
  // console.log(user);

  const handleRemoveVenue = async () => {
    try {
      await removeVenue({
        variables: {
          venueId: user.venue._id,
        },
      });
    } catch (error) {
      console.error("Error removing venue:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3"></div>
      <div>
        <div className="flex-row justify-center mb-3">
          {/* Render the "Add Venue" button if the user has not added a venue */}
          {!user.venue && (
            <Link to="/add-venue">
              <Button size="lg" colorScheme="teal">
                Add Venue
              </Button>
            </Link>
          )}
        </div>

        {user.venue && (
          <div style={{ marginTop: "1rem" }}>
            <Text fontSize="3xl" fontWeight="bold">
              Venue:
            </Text>
            <Link to={`/venue/${user.venue._id}`}>
              <Text
                color="teal.500"
                fontSize="xl"
                fontWeight="bold"
                textDecoration="underline"
              >
                {user.venue.venueName}
              </Text>
            </Link>

            <Button
              style={{ marginTop: "1.5rem" }}
              onClick={handleRemoveVenue}
              colorScheme="red"
            >
              Remove Venue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
