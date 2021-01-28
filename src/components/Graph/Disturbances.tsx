import React, { useState } from 'react';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Date' was resolved to '/home/erik/IADM8... Remove this comment to see the full error message
import { prettyPrintDate } from '../Date';

const Disturbances = (props: any) => {
    const [showInfo, setShowInfo] = useState("");
    const handleEnter = (event: any) => {
	setShowInfo(event.target.id);
	event.preventDefault();
    }
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    const handleLeave = (event) => {
	setShowInfo("");
	event.preventDefault();
    }
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'disturbance' implicitly has an 'any' ty... Remove this comment to see the full error message
    return !(props.data) ? null : props.data.map( disturbance => {
	let x = disturbance[4] * props.scalar_x;
	let width = (disturbance[5]-disturbance[4])*props.scalar_x
	
	if (width<0) return null;
	return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	    <React.Fragment key={"DisturbanceBox"+disturbance[0]+disturbance[4]+disturbance[5]}>
		{showInfo === ""+disturbance[4] ? (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		     <text x={x}
			   y="3"
			   fontSize="2"
			   key={"info"+x}
			   opacity="1">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
			 <tspan x={x} y="5" >{disturbance[0]}</tspan>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
			 <tspan x={x} dy="3" >{disturbance[1]}</tspan>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
			 <tspan x={x} dy="3.5">from: {prettyPrintDate(disturbance[2])}</tspan>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
			 <tspan x={x} dy="3">to  : {prettyPrintDate(disturbance[3])}</tspan>
		     </text>) : null}
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
