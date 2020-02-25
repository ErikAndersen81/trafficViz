import React, { useState, useEffect } from 'react';
import Blueprints from '../../constants/blueprints';
import Intersection from '../Intersection';


/* 
 * This component is responsible for rendering blueprints and retreive data 
 * for the given date from the server and upon succesful retrieval
 * merge the data with corresponding blueprints
 */
const Intersections = (props) => {
    const [data, setData ] = useState(null);
    const [requested, setRequested] = useState(false);
    const resource = "http://127.0.0.1:5000/" + props.simulationType;
    const payload = {
	method: 'POST',
	headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	},
	body: JSON.stringify({date:props.date})
    }
    
    useEffect( () => {
	/* Only request data from trafficSimulator if we change the simulation type or date */
	if (requested===props.simulationType + props.date) {return;}
	setRequested(props.simulationType + props.date);
	fetch(resource, payload).then(
	    /* extract data from response and pass it on */
	    (response) => {
		return response.json();
	    }).then(
		/* merge retreived data with blueprint data and update state */
		(jsonData) => {
		    /* Copy the blueprints so we dont mess them up for future merges */
		    const mergedData = mergeData(jsonData['data'], JSON.parse(JSON.stringify(Blueprints)));
		    setData(mergedData);
		}).catch(e => console.log(e));
    }, [props.simulationType, requested, resource, payload, props.date]);
    return (
	<>
	    { data ? Object.keys(data).map( key => <Intersection data={data[key]} name={key} key={key} />) : null}
	</>
    )
};

const mergeData = (data, blueprints) => {
    var dict = {};
    Object.keys(blueprints)
	  .forEach( tag => {
	      dict[tag]={...blueprints[tag]};
	      dict[tag].streets
		       .forEach((street,idx) => {
			   var streetDict = {};
			   street.lanes
				 .forEach(lane => {
				     streetDict[lane]=JSON.parse(data[tag])[lane];
				 });
			   dict[tag].streets[idx].lanes = streetDict;
		       });
	  })
    return dict
}

export default Intersections;
