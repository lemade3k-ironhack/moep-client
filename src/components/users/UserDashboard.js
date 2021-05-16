import { React } from "react";
import { Link } from "react-router-dom";
import Upcoming from "./concerts/Upcoming";

function UserDashboard(props) {
   const { user } = props;
   const { upcoming } = props;

   return (
      <>
         <h1>Hello {user.name}</h1>
         <Link to={"/concerts"}>Lineup</Link>
         {upcoming.map((upcomingBand) => {
            return <Upcoming upcomingBand={upcomingBand} />;
         })}
      </>
   );
}
export default UserDashboard;
