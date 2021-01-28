import React, {useContext} from 'react';
import Disturbances from './Disturbances';
import Paths from './Paths'
import Grid from './Grid';
import { DateTimeContext } from '../Context';
import useData from '../Hooks/useData.js';

const Graph = props => {
    const {starttime, endtime} = useContext(DateTimeContext);
    const { data } = useData({starttime:starttime,
			      endtime:endtime,
			      intersections:props.intersections,
			      graphOptions:props.graphOptions}, 'data');
    if (!data) return <BlankGraph />
    const slice = data.interval;
    const maxVal = data.maxVal !== 0 ? data.maxVal : 1;
    const scalar_x = 100/slice;
	const scalar_y = 100/maxVal;
    const paths = Object.keys(data.pathData).map( group => (
	<Paths scalar_x={scalar_x}
	       scalar_y={scalar_y}
	       group={group}
	       key={"Paths" + group}
	       data={data.pathData[group]}/>
    ));
    const grid = (
	<Grid scalar_x={scalar_x}
	      scalar_y={scalar_y}
	      slice={slice}
	      maxVal={maxVal}
	      dates={data.dates}/>
    );
    return (
    <>
	<div className="chartWide">
	    <svg viewBox="-7 -10 110 120"
		 preserveAspectRatio="none"
		 height="100%"
		 width="100%">
		<g id={props.intersection + "hLines"} key={props.intersection + "hLines"}>
		    {grid}
		    {paths}
		    <text strokeWidth="0"
			  fontSize="4"
			  textAnchor="right"
			  x="-6"
			  y="-5">Passings</text>
		    <text strokeWidth="0"
			  fontSize="7"
			  fill="cyan"
			  x={slice/2} 
			  y="-3">{props.name}</text>
		    <Disturbances data={data.disturbances} scalar_x={scalar_x}/>
		</g>
	    </svg>
	</div>
    </>
    )
};

const BlankGraph = props => {
    return (
	<>
	    <h3 className="chartHeader">{props.intersection}</h3>
	    <div className="chartWide">
	    </div>
	</>);
}


export default Graph;
