import {useState, useEffect} from 'react';

const GetData = (props) => {
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
		(jsonData) => {
		    if (jsonData.error) console.log("getData error:",jsonData.error);
		    const convertedData = {};
		    Object.keys(jsonData.data).forEach(key => {
			convertedData[key] = JSON.parse( jsonData.data[key] );
		    });
		    props.setData(convertedData);
		}).catch((e) => console.log(e));
    }, [props, props.simulationType, requested, resource, payload, props.date]);
}

export default GetData;