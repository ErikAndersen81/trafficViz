import React, { useState } from 'react';
import { GetData } from '../utility';
import { Bar } from '../BarChart';

const IntervalBarCharts = (props) => {
    const [data, setData] = useState();
    GetData({date:props.date, simulationType:'real24h', setData:setData});
    console.log(data);
    return (
	<div className="chartsHolder">
	    <div className="charts">
		{
		    null ?
		    Object.keys(data).map( (intersection,idx) =>
			<BarChart24h key={idx}
				     name={intersection}
				     data={data[intersection]}/>)
		    : null
		}
		{
		data ? <BarChart24h key={0}
				    name={Object.keys(data)[0]}
				    data={data[Object.keys(data)[0]]}/> : null
		}
	    </div>
	</div>
);
}

const BarChart24h = props => {
    console.log(props.key);
    console.log(props.intersection);
    console.log(props.data);
    /* Use the first key in the first lane (they are sorted since ES2015) as offset */
    const offset = parseInt(Object.keys(props.data[[Object.keys(props.data)[0]]])[0])
    
    console.log(offset);
    const data2path = (data, offset) => {
	const pathList = Object.keys(data).map(key => " L "+( parseInt(key) - offset) +" "+(250 - parseInt(data[key])))
	var path = ""
	pathList.forEach(p => path += p);
	path = "M" + path.slice(2)+" ";
	return path;
    }

    var paths = "";
    Object.keys(props.data).forEach(key => paths += data2path(props.data[key], offset))
    const path = data2path(props.data['21'], offset);
    
    return (
	<div className="chart">
	    <svg
		viewBox="0 0 250 250"
		preserveAspectRatio="none"
		height="100%"
		width="100%"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink">
		<g>
		    <path d={paths}
			  strokeWidth="1"
			  stroke="red" />
		</g>
	    </svg>
	</div>
    )
}

export default IntervalBarCharts;
