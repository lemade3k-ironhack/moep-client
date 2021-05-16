import { React } from "react";
import { Link } from "react-router-dom";

function UserDashboard(props) {
  const { user } = props;

  return (
    <>
      <h1>Hello {user.name}</h1>
      <Link to={"/concerts"}>Lineup</Link>
    </>
  );
}
export default UserDashboard;
