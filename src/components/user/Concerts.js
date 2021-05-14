import React from "react";
import { Link } from "react-router-dom";

function Concerts(props) {
   const { concerts } = props;
   console.log(concerts);
   return (
      <div>
         <h3>All Bands</h3>
         {concerts.map((concert) => {
            return (
               <div>
                  <Link to={`/concerts/${concert._id}`}>
                     {concert.bandname}
                  </Link>
               </div>
            );
         })}
      </div>
   );
}

export default Concerts;
