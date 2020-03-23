import React, { useState } from 'react';


const BarChart = props => {
    return (
	<div className="chart">
	<svg
	viewBox="-2 -5 245 245"
	preserveAspectRatio="none"
	height="100%"
	width="100%"
	xmlns="http://www.w3.org/2000/svg"
	xmlnsXlink="http://www.w3.org/1999/xlink"
	>
	<text x="0" y="0" transform="scale(.5,.5) translate(400,10)" fill="white">{props.name}</text>
	<g>
	{
	    Object.keys(props.data).map( (lane,idx) =>
					 <Bar key={"bar"+idx}
						  y={idx}
						  x="1"
						  name={lane}
						  width={props.data[lane]}/>)
	}
	</g>
	</svg>
	
    </div>
    );
}

const Bar = (props) => {
    const [showVal, setShowVal] = useState(false);
    const showValue = () => {
	setShowVal(true);
    };
    const hideValue = () => {
	setShowVal(false);
    };
    return (
	<>
	    <rect className="Bar"
		  onMouseOver={showValue}
		  onMouseLeave={hideValue}
		  width={props.width}
		  height="8"
		  x={props.x+5}
		  y={props.y*8}
	    />
	    { showVal ? 
	      <BarLabel name={props.width}
			y={(props.y+1)*8 - 1}
			x={props.width+20}
			fill="#aaffff"
	      /> : null
	    }
	    
	    <BarLabel name={props.name}
		      y={(props.y+1)*8}
		      x={props.x}
		      fill="#aaffaa" />
	</>
    )
};

const BarLabel = props => {
    return (
	<text className="BarLabel"
	      fontSize="6"
	      x={props.x}
	      y={props.y-1}
	      fill={props.fill}>
	    {props.name}
	</text>
    );
}

export { Bar }

export default BarChart;
