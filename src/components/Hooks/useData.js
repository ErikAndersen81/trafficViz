import {useState, useEffect} from 'react';

const useData = (request) => {
    const controller = new AbortController();
    const body = JSON.stringify({starttime:request.starttime,
				 endtime:request.endtime,
				 interval:request.interval,
				 intersections:request.intersections,
				 disturbances:request.disturbances,
				 datatypes:request.datatypes});
    return useDataHook(body, controller);
}

/* use this custom hook to fetch data from the server */
const useDataHook = (body, controller) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    /* I should change this to be set as a shell variable if I want to run it on a different network */
    const resource = "http://192.168.1.86:5000/data";
    const payload = {
	signal: controller.signal,
	method: 'POST',
	headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	},
	body: body};

    useEffect( () => {
	const fetchData = async () => {
	    try {
		const response = await fetch(resource, payload);
		const jsonData = await response.json();
		if (jsonData.error) {
		    setError(jsonData.error);
		} else {
		    setData(jsonData);
		}}
	    catch (err) {
		console.log(err)
		if (controller.signal.aborted) {
		    console.log("aborted!!")
		} else {
		    setError(err);
		}
	    }
	}
	setIsLoading(true);
	fetchData()
	setIsLoading(false);
	return () => {controller.abort()}
    }, [body]);
    return [data, isLoading, error];
}

export default useData;