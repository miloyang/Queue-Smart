import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { username: userParam } = useParams();
  // console.log("userParam", userParam);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // const [showAddVenue, setShowAddVenue] = useState(false);

  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/me" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        {/* <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2> */}
      </div>
      <div>
        <div className="flex-row justify-center mb-3">
          {/* Other profile page content */}
          <Link to="/add-venue">
            <Button size="lg" colorScheme="teal">Add Venue</Button>
          </Link>
        </div>
        {console.log(user.venue)}
        {/* Display the venue if the user has added one */}
        {user.venue && (
          <div>
            <h2>Venue:</h2>
            <p>{user.venue}</p>
          </div>
        )}
        {/* {<Button onClick={() => setShowAddVenue(true)}>Add Venue</Button>} */}
        {/* <AddVenue /> */}
        {/* <VenueForm /> */}
      </div>
    </div>
  );
};

export default Profile;
