import React , { useState } from 'react';
import { Circle, Tooltip, Popup } from 'react-leaflet';
import Blueprints from '../../constants/blueprints';
import { GetData } from '../utility';
import BarChart from '../BarChart';

const IntersectionMarkers = (props) => {
    const [data, setData] = useState();
    GetData({date:props.date, simulationType:props.simulationType, setData:setData});
    
    return (
	<div className="markers">
	    {
		data ?
		Object.keys(data).map( (intersection,idx) =>
		    <IntersectionMarker key={idx}
					name={intersection}
					data={data[intersection]}/>)
		: null
	    }
	</div>
    );
};

const IntersectionMarker = props => {
    const blueprint = Blueprints[props.name];
    
    if (!blueprint || !props.data) return null;
    var radius = 0;
    Object.values(props.data).forEach( x => radius += x);
    var content = `<span><p>${props.name}<\br>`;
    Object.keys(props.data).forEach( key => content += `${key}: ${props.data[key]}`);
    content += `</p></span>`;
    radius *= .5;
    return (
	<>
	    <Circle center={{lat:blueprint.latitude, lng:blueprint.longitude}} radius={radius}>
		<Tooltip>{props.name}</Tooltip>
		<Popup maxWidth="300" minWidth="300" maxHeight="300">
		    <BarChart name={props.name} data={props.data} />
		</Popup>
	    </Circle>
	</>
    )
}


export default IntersectionMarkers;
