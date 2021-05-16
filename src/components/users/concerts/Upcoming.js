import React from "react";

function Upcoming(props) {
   const { upcomingBand } = props;

   return (
      <>
         <h1>{upcomingBand.bandname}</h1>
      </>
   );
}

export default Upcoming;
