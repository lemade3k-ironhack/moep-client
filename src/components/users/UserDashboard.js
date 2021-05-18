import { React } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../header";

function UserDashboard(props) {
  const { user, onLogout } = props;

  if (!user) return <Redirect to={"/"} />;

  return (
    <>
      <Header onLogout={onLogout} />
      <h1>Hello {user.name}</h1>
      <Link to={"/concerts"}>Lineup</Link>
    </>
  );
}
export default UserDashboard;
