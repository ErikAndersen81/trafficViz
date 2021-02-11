import {useState, useEffect} from 'react';

const formatDate = (date:Date):string => {
	return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

export type GraphData = {
	pathData:PathData;
	dates:Array<Date>;
	interval:number;
	disturbances:any;
	maxVal:number;
}

export type MarkersData = {
	totalPassings:Map<string,number>;
	pctAbove:Map<string,number>;
	pctBelow:Map<string,number>;
	measurements:number;
}

export type CoordinatesData = {
	intersections:Map<string, CoordinatesType>;
}

export type CoordinatesType = {
	latitude:number;
	longitude:number;
}

export type GroupType = 'mean'|'median'|'aggregated';

export type PathData = Map<GroupType,Group>;

export type Group = Map<string, IntersectionData>;

export type IntersectionData = Map<string, LaneData>;

export type LaneData = Array<number|null>;

export type ResourceType = 'data'|'coordinates'|'markers'|'events';

export type EventMarkersData = {
	events:Map<string, EventType>
}
export type EventType = {
	latitude:number;
	longitude:number;
	description:string;
	starttime:string;
	endtime:string;
	type:string;
}

const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
};

export const getGraphDataRequest = (starttime:Date, endtime:Date, intersections:Array<string>, graphOptions:Array<string>):RequestInit => {
	const body = JSON.stringify(
		{starttime:formatDate(starttime),
		endtime:formatDate(endtime),
		intersections:intersections,
		graph_options:graphOptions
	});
			
	const payload:RequestInit = {
		method: 'POST',
		headers: headers,
		body: body
	};
	return payload;
}

export const getMarkersDataRequest = (starttime:Date, endtime:Date):RequestInit => {
	const body = JSON.stringify(
		{starttime:formatDate(starttime),
		endtime:formatDate(endtime),
	});
			
	const payload:RequestInit = {
		method: 'POST',
		headers: headers,
		body: body
	};
	return payload;
}


export const getCoordinatesDataRequest = ():RequestInit => {
	const payload:RequestInit = {
		method: 'GET',
		headers: headers,
	};
	return payload;
}

const useData = (resource:ResourceType) => {
    const [data, setData] = useState<GraphData|MarkersData|CoordinatesData|EventMarkersData|null>(null);
    const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [payload, setPayload] = useState<RequestInit|undefined>();

    useEffect( () => {
		const fetchData = async () => {
			try {
				const url = "http://127.0.0.1:5000/" + resource;
				const response = await fetch(url, payload);
				const jsonData = await response.json();
				if (jsonData.error) {
				setError(jsonData.error);
				} else {
					if (resource === 'coordinates'){
						let intersections = new Map<string,CoordinatesType>(Object.keys(jsonData.intersections).map((k:string) => [k, (jsonData.intersections[k] as CoordinatesType ) ]))
						setData( () => ({intersections:intersections}));
					} else if (resource === 'markers'){
						let totalPassings = new Map<string, number>();
						let pctAbove = new Map<string, number>();
						let pctBelow = new Map<string, number>();
						Object.keys(jsonData.total_passings).forEach(k => {
							totalPassings.set(k, jsonData.total_passings[k]);
							pctAbove.set(k, jsonData.pct_above[k]);
							pctBelow.set(k, jsonData.pct_below[k]);
						})
						setData(() => ({totalPassings, pctAbove, pctBelow, measurements:jsonData.measurements}));
					} else if (resource === 'events') {
						let events = new Map<string,EventType>(Object.keys(jsonData.events).map((k:string) => [k, (jsonData.events[k] as EventType)]))
						setData({events})
					} else {
						let pathData:PathData = new Map<GroupType, Group>();
						let dates:Array<Date>= new Array<Date>(
							...jsonData.dates.map((date:string) => new Date(date))
							);
						let interval:number = jsonData.interval;
						let disturbances:any = jsonData.disturbances;
						let maxVal:number = jsonData.maxVal;
						if (jsonData['mean']) pathData.set('mean', new Map<string, IntersectionData>());
						if (jsonData['median']) pathData.set('median', new Map<string, IntersectionData>());
						Object.keys(jsonData['pathData']).forEach(group => {
						if (jsonData['pathData'][group]){
							pathData.set(group as GroupType, new Map<string, IntersectionData>());
							Object.keys(jsonData['pathData'][group]).forEach(intersection => {
								pathData.get(group as GroupType)?.set(intersection, new Map<string, LaneData>())
								Object.keys(jsonData['pathData'][group][intersection]).forEach(lane => {
									pathData.get(group as GroupType)?.get(intersection)?.set(lane, jsonData['pathData'][group][intersection][lane])
								})
							})
						}});
					setData(() => ({pathData, dates, interval, disturbances, maxVal}));
					}
				}}
			catch (err) {
				console.log(err)
				setError(err);
			}
		}
	if (payload !== undefined) {
		setIsLoading(true);
		fetchData();
		setIsLoading(false);
	}}, [resource, payload]);
    return {data, isLoading, error, setPayload};
}

export default useData;
