import React, {useContext} from 'react';
import Disturbances from './Disturbances';
import Paths from './Paths'
import Grid from './Grid';
import { DataContext } from '../Context';

const Graph = props => {
    const data = useContext(DataContext);
    if (!data) return <BlankGraph />
    const slice = data.interval;
    const maxVal = data.maxVal !== 0 ? data.maxVal : 1;
    const scalar_x = 100/slice;
    const scalar_y = 100/maxVal;
    return (
	<>
	    <div className="chartWide">
		<svg viewBox="-7 -10 110 120"
		     preserveAspectRatio="none"
		     height="100%"
		     width="100%">
		    <g id={props.intersection + "hLines"} key={props.intersection + "hLines"}>
			<Grid scalar_x={scalar_x}
			      scalar_y={scalar_y}
			      slice={slice}
			      maxVal={maxVal}
			      dates={data.dates}/>
			<Paths scalar_x={scalar_x}
			       scalar_y={scalar_y}
			       data={data.intersections}/>
			<text strokeWidth="0"
			      fontSize="4"
			      textAnchor="right"
			      x="-6"
			      y="-5">cars</text>
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