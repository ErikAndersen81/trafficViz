import React, { useState } from 'react';
import { GetData } from '../utility';

const Graphs = (props) => {
    const [data, setData] = useState();
    GetData({date:props.date, simulationType:'real48h', setData:setData});
    return (
	<div className="chartsholder chartSpace">
	    {
		data ?
		Object.keys(data).map( (intersection,idx) =>
		    <Graph48h key={idx}
			     name={intersection}
			     data={data[[intersection]]}/>)
		: null
	    }
	    {
		null ? <Graph48h key={0}
		name={Object.keys(data)[0]}
		data={data[Object.keys(data)[0]]}/> : null
	    }
	    
	</div>
    );
}

const Graph48h = props => {
    /* Use the first key in the first lane ('dicts' are sorted since ES2015) as offset */
    const offset = parseInt(Object.keys(props.data[[Object.keys(props.data)[0]]])[0])
    const maxVal = 350; /* This is the maximum number of cars we expect to see */
    const hLines = [1,2,3,4,5,6,7].map(i => <path d={"M -1 "+ (i*50) + " L 194 "+ (i*50)}
						  stroke="blue"
						  strokeDasharray=".2"
						  strokeWidth="1"
						  fill="transparent"
						  shapeRendering="optimizeSpeed"
						  id={props.name+"hLine" + i}
						  key={props.name+"hLine" + i}
						  className="hLine"/>)
    const hLabels = [1,2,3,4,5,6,7].map(i => <text stroke="white"
	                                           fill="transparent"
						   y="0"
	                                           key={props.name + "hLabel" + i}
						   x={i*50}> {i*50}</text>);
    const data2path = (data, offset) => {
	let x = (i) =>  parseInt(i) - offset;
	let y = (i) => maxVal - parseInt(data[i]);
	const pathList = Object.keys(data).map(key => " L "+x(key) +" "+y(key));
	var path = ""
	pathList.forEach(p => path += p);
	path = "M" + path.slice(2)+" ";
	return path;
    }

    
    const paths = Object.keys(props.data)
			.map((key,idx) => <path d={data2path(props.data[key], offset)}
			fill="transparent"
			stroke={colors[idx]}
			strokeWidth=".2"
			shapeRendering="optimizeSpeed"
			key={"path" + key + props.name}/> )
    
    return (
	<div className="chart">
	    <svg
		viewBox={"-4 4 196 "+ maxVal}
		preserveAspectRatio="none"
		height="100%"
		width="100%">
		<g id={props.name + "hLines"} key={props.name + "hLines"}>
		    {hLines}
		    {hLabels}
		    {paths}
		</g>
	    </svg>
	</div>
    )
}

const colors=[
    "Plum",
    "Violet",
    "Orchid",
    "Fuchsia",
    "Magenta",
    "MediumOrchid",
    "MediumPurple",
    "BlueViolet",
    "DarkViolet",
    "DarkOrchid",
    "DarkMagenta",
    "Purple",
    "Indigo",
    "DarkSlateBlue",
    "SlateBlue",
    "MediumSlateBlue"
]

export default Graphs;
