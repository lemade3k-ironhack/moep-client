import React from "react";
import ConcertDetail from "./ConcertDetail";

function Concerts(props) {
   const { concerts } = props;

   return (
      <div>
         {concerts.map((concert) => {
            return <ConcertDetail concert={concert} />;
         })}
      </div>
   );
}

export default Concerts;
