import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import { Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import { Venue } from "../../../server/models";

const Profile = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const { username: userParam } = useParams();
  // console.log("userParam", userParam);

  useEffect(() => {
    refetch(); // Refetch user data when component mounts or userParam changes
  }, [userParam, refetch]);

  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });

  // const { loading, data } = useQuery(QUERY_ME);
  console.log(data);

  const user = data?.me || data?.user || {};
  console.log(user);

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

        {/* Display the added venue as a clickable link if the user has added one */}
        {/* {user.venue && (
          <div>
            <h2>Venue:</h2>
            <Link to={`/venue/${user.venue._id}`}>
              <p>{user.venue.venueName}</p>
            </Link>
          </div>
        )} */}

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
          </div>
        )}
      </div>
    </div>

    // <div>
    //   <div className="flex-row justify-center mb-3">
    //   </div>
    //   <div>
    //     <div className="flex-row justify-center mb-3">
    //       {/* Other profile page content */}
    //       <Link to="/add-venue">
    //         <Button size="lg" colorScheme="teal">Add Venue</Button>
    //       </Link>
    //     </div>
    //     {console.log(user.venue)}
    //     {/* Display the venue if the user has added one */}
    //     {user.venue && (
    //       <div>
    //         <h2>Venue:</h2>
    //         <p>{user.venue.venueName}</p>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default Profile;
