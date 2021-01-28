import {useState, useEffect} from 'react';

const useData = (request: any, res: any) => {
    const controller = new AbortController();
    const body = request === 'get' ? 'get' :
	JSON.stringify({starttime:request.starttime,
			endtime:request.endtime,
			interval:request.interval,
			intersections:request.intersections,
			disturbances:request.disturbances,
			graph_options:request.graphOptions});
    return useDataHook(body, res, controller);
}

/* use this custom hook to fetch data from the server */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'body' implicitly has an 'any' type.
const useDataHook = (body, res, controller) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    /* I should change this to be set as a shell variable if I want to run it on a different network */
    res = res ? res : "";
    const resource = "http://127.0.0.1:5000/" + res;
    const payload = body === 'get' ? {
	signal: controller.signal,
	method: 'GET',
	headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	}} :
	  {
	      signal: controller.signal,
	      method: 'POST',
	      headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
	      },
	      body: body};
    
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
    
    useEffect( () => {
	console.log("hook called");
	setIsLoading(true);
	fetchData()
	setIsLoading(false);
	return () => {controller.abort()}
    }, [body, controller, fetchData]);
    return {data:data, isLoading:isLoading, error:error};
}

export default useData;
