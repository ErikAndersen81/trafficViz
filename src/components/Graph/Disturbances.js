import React, { useState } from 'react';
import { prettyPrintDate } from '../Date';

const Disturbances = props => {
    const [showInfo, setShowInfo] = useState("");
    const handleEnter = (event) => {
	setShowInfo(event.target.id);
	event.preventDefault();
    }
    const handleLeave = (event) => {
	setShowInfo("");
	event.preventDefault();
    }
    return props.data.map( disturbance => {
	let x = disturbance[4] * props.scalar_x;
	let width = (disturbance[5]-disturbance[4])*props.scalar_x
	
	if (width<0) return null;
	return (
	    <React.Fragment key={"DisturbanceBox"+disturbance[0]+disturbance[4]+disturbance[5]}>
		{showInfo === ""+disturbance[4] ? (
		     <text x={x}
			   y="3"
			   fontSize="2"
			   key={"info"+x}
			   opacity="1">
			 <tspan x={x} y="5" >{disturbance[0]}</tspan>
			 <tspan x={x} dy="3" >{disturbance[1]}</tspan>
			 <tspan x={x} dy="3.5">from: {prettyPrintDate(disturbance[2])}</tspan>
			 <tspan x={x} dy="3">to  : {prettyPrintDate(disturbance[3])}</tspan>
		     </text>) : null}
		<rect className="disturbance"
		      x={x}
		      key={"rect"+x}
		      width={width}
		      id={disturbance[4]}
		      onMouseEnter={handleEnter} onMouseLeave={handleLeave}
		/>
	    </React.Fragment>
	)})
};


export default Disturbances;
