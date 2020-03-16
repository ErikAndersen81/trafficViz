import React, { useState } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { GetData } from '../utility';

const Disturbances = props => {
    const [data, setData] = useState([]);
    GetData({date:props.date, simulationType:"train", setData:setData});
    /* test: 2019-03-29 15:15 */
    return (
	<>
	    {
		data && data[0] ?
		<Disturbance coords={data[0].coords} type={data[0].type} location={data[0].location} start={data[0].starttime} end={data[0].endtime} /> :null
	    }
	</>
);
}

const Disturbance = (props) => {
    const coords = JSON.parse(props.coords.replace(/'/g, '"'));
    return (
	<>
	    {
		Object.keys(coords).map( coord => {
		    return (
			<Marker position={{lat:coords[coord].latitude, lng:coords[coord].longitude}}
				key={coord}>
			    <Tooltip>
				<b>{props.location}</b>
				<br/>
				{props.type}
				<br/>
				Start: {props.start}
				<br/>
				End: {props.end}
			    </Tooltip>
			</Marker>)
		})
	    }
	</>);
}
    
export default Disturbances;
