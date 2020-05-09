import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import useData from '../Hooks/useData';


const Disturbances = props => {
    const [data, loading, error] = useData({starttime:props.date, disturbances:true});
    const disturbances = data ? data.disturbances.data : [];
    return (
	<>
	    {
		disturbances.map( disturbance => <Disturbance key={"DisturbanceMarker" + disturbance[4]}
							      coords={disturbance[4]}
							      type={disturbance[1]}
							      location={disturbance[0]}
							      start={disturbance[2]}
							      end={disturbance[2]} />)
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
				key={"Marker"+coord}>
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
