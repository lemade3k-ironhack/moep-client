import React from 'react'
import moment from 'moment'

function UpcomingDetail(props) {
  const { concert } = props
  return (
    <div>
      <img
        width="300px"
        alt={`${concert.bandname}-image`}
        src={concert.image}
      />
      <div>
        <h2>
          {concert.bandname}
        </h2>
        <h4 >
          {`${moment(concert.starttime).format("yyyy-MM-DD")} from 
          ${moment(concert.starttime).format("hh:mm A")} to 
          ${moment(concert.enttime).format("hh:mm A")} on ${concert.stage.name}`}
        </h4>
        <p >
          {concert.description}
        </p>
      </div>
    </div>
  )
}

export default UpcomingDetail;
