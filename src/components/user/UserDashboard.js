import { React, useState, useEffect } from "react";

import { Link } from "react-router-dom";

function DashUser(props) {
   // initial state

   const { user } = props;

   return (
      <div>
         <h1>Hello {user.name}</h1>
         <Link to={"/concerts"}>Lineup</Link>
      </div>
   );
}
export default DashUser;
