import { React, useState, useEffect } from "react";
import axios from "axios";
import Concerts from "./Concerts";
function DashUser(props) {
   // initial state
   const [concerts, updateConcerts] = useState([]);

   useEffect(() => {
      // This code runs just once in the entire lifecycle on this Component
      axios.get("http://localhost:5005/api/concerts").then((response) => {
         updateConcerts(response.data);
      });
   }, []);

   return (
      <div>
         <h1>Hello</h1>
         <Concerts concerts={concerts} />
      </div>
   );
}
export default DashUser;
