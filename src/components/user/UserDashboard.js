import { React, useState, useEffect } from "react";
import axios from "axios";
import Concerts from "./Concerts";
import { Link } from "react-router-dom";

function DashUser(props) {
   // initial state
   const [concerts, updateConcerts] = useState([]);
   const { user } = props;

   useEffect(() => {
      // This code runs just once in the entire lifecycle on this Component
      axios.get("http://localhost:5005/api/concerts").then((response) => {
         updateConcerts(response.data);
      });
   }, []);

   return (
      <div>
         <h1>Hello {user.name}</h1>
         <Link
            to={{
               pathname: "/concerts",
               props: concerts,
            }}
         >
            Lineup
         </Link>
         <Concerts concerts={concerts} />
      </div>
   );
}
export default DashUser;
