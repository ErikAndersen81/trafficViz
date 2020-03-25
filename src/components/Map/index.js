import React from 'react';

import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import IntersectionMarkers from '../IntersectionMarkers';
import Disturbances from '../Disturbances';

const Map = (props) => {
    return (
	<LeafletMap className="ShowWide"
		    center={[52.0704978, 4.3006999]}
		    zoom={13}
		    minZoom={12}
		    attributionControl={true}
		    zoomControl={true}
		    doubleClickZoom={true}
		    scrollWheelZoom={true}
		    dragging={true}
		    animate={true}
		    easeLinearity={0.35}
		    maxBounds={[[52.02,4.1],[52.14, 4.45]]} 
	>
	    <TileLayer
	    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
	    <IntersectionMarkers simulationType={props.simulationType} date={props.date}/>
	    <Disturbances date={props.date}/>
	</LeafletMap>	
    );

}


export default Map;
