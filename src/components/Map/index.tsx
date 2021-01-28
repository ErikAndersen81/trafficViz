import React from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../IntersectionMarkers' was resolved to '/... Remove this comment to see the full error message
import IntersectionMarkers from '../IntersectionMarkers';
/* import Disturbances from '../Disturbances'; */

const Map = (props: any) => {
    return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<LeafletMap className="Map"
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
	>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <TileLayer
		url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <IntersectionMarkers handleIntersectionClick={props.handleIntersectionClick}/>
	</LeafletMap>	
    );

}


export default Map;
