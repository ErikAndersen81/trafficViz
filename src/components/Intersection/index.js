import React from 'react';

const Intersection = (props) => {
    const data = props.data;
    const Streets = data ? data.streets.map(street =>
	(
	    <Street key={props.name+street.rotation}
		    id={props.name+street.rotation}
		    rotation={street.rotation}
		    lanes={street.lanes}
		    x={data.x}
		    y={data.y}
	    /> )
    ): null;
    
    /* Nest the intersection in a its own group */
    return ( <>
	{ data ? 
	<g className="intersection">
	    { <text x={data.x} y={data.y}>{props.name}</text> }
	    { Streets ? Streets : null }
	</g> : null } </>
    )
};

/* Handle visualization of a group of lanes */ 
const Street = (props) => {
    const lanes = Object.keys(props.lanes).map( (lane,idx) =>
	(
	    <g key={props.id+lane}>	    
	        <Lane key={lane}
	              cars={props.lanes[lane]}
	              x={props.x}
	              y={props.y}
	              offset={idx}
	        />
		
	    </g>
	));
    
    const rotation = `rotate(${props.rotation},${props.x + 1},${props.y + 1})`;
    
    return (
	<g transform={rotation}>
	    { lanes }
	</g>
    )
};

/* A lane is represented by a rectangle. */
const Lane = (props) => {
    return (
	<rect
	    className="lane"
	    fill={carsToColor(props.cars)}
	    width="1"
	    height="30"
	    x={props.x + props.offset}
	    y={props.y}/>
    )
};

/* no cars=green, 50 cars=yellow, 100+ cars=red. Grey if there's no data.*/
const carsToColor = (cars) => {
    if (!cars) return "grey"
    var R;
    var G;
    var B = 0;
    var value = Math.min(255,parseInt(cars*5.1));
    if (cars < 50) {R = value; G = 255;}
    else if (cars > 50) {R=255; G = 255-value;}
    else {R=255;G=255}
    return `RGB(${R},${G},${B})`
}

export default Intersection;
