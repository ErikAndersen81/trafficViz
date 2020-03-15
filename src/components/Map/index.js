import React from 'react';

import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import IntersectionMarkers from '../IntersectionMarkers';
import Disturbances from '../Disturbances';

const Map = (props) => {
    return (
	<LeafletMap className="Map"
		    center={[52.0704978, 4.3006999]}
		    zoom={11}
		    minZoom={11}
		    attributionControl={true}
		    zoomControl={true}
		    doubleClickZoom={true}
		    scrollWheelZoom={true}
		    dragging={true}
		    animate={true}
		    easeLinearity={0.35}>
	    <TileLayer
		url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
	    <IntersectionMarkers simulationType={props.simulationType} date={props.date}/>
	    <Disturbances date={props.date}/>
	</LeafletMap>	
    );

}


export default Map;
