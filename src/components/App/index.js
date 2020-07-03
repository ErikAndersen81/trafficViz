import React, { useState } from 'react';
import DatePicker from '../Date';
import Skip from '../Skip';
import RunButton from '../RunButton';
import Map from '../Map';
import Graph from '../Graph';
import { HighlightContext, DataContext, DateTimeContext } from '../Context';
import useData from '../Hooks/useData';

import GraphOptions from '../GraphOptions';

function App() {
    /* Set default values */
    const [datatypes, setDatatypes] = useState(["deviant", "aggregated" ]);
    const [intersections, setIntersections] = useState([]);
    const [starttime, setStarttime] = useState("2016-11-28 05:00");
    const [endtime, setEndtime] = useState("2016-12-05 05:00");

    const [highlighted, setHighlighted] = useState("");
    
    const [data, isLoading, error] = useData({starttime:starttime,
					      endtime:endtime,
					      intersections:intersections,
					      datatypes:datatypes,
    });
    const interval = {starttime:[starttime, setStarttime],
		      endtime:[endtime, setEndtime]}
    const handleIntersectionClick = event => {
	const key = event.target.options.children._owner.key;
	const intersection = key.slice(0,key.indexOf('I'))
	if (intersections.find(x => intersection === x)) {
	    setIntersections(intersections.filter(x => x !== intersection));
	} else {
	    setIntersections(intersections.concat([intersection]));
	}
    }

    const handleIntersectionHover = event => {
	const key = event.target.options.children._owner.key;
	console.log(event.type);
	console.log(key);
	if (event.type === "mouseover") {};
	
	
    }
    
    return (
	<DataContext.Provider value={data}>
	    <HighlightContext.Provider value={{highlighted:highlighted, setHighlighted:setHighlighted}}>
		<div className="mapAndGraphsContainer">
		    <Map handleIntersectionClick={handleIntersectionClick}
			 handleIntersectionHover={handleIntersectionHover} />
		    <div>
			<div className="GraphBox">
			    <Graph />
			    <GraphOptions datatypes={datatypes}
					  setDatatypes={setDatatypes}
			    />
			</div>
			<DateTimeContext.Provider value={interval} >
			    <div className="DatetimeBox">
				<BoxHeader>Time Frame Boundaries</BoxHeader>
				<div className="DatetimeSelector">
				    <p>From</p>
				    <DatePicker time="starttime" max={endtime.slice(0,10)} />
				</div>
				<div className="DatetimeSelector">
				    <p>To</p>
				    <DatePicker time="endtime" min={starttime.slice(0,10)}/>
				</div>
				<div>
				    <BoxHeader>Move Time Frame</BoxHeader>
				    <div className="DatetimeSelector">
					<p>Step through time</p>
					<Skip />
				    </div>
				</div>
				{null ? <div>
				    <BoxHeader>Automatic Time Skip</BoxHeader>
				    <RunButton />
				</div> : null }
			    </div>
			</DateTimeContext.Provider>
		    </div>
		</div>
	    </HighlightContext.Provider>
	</DataContext.Provider>
    );
}

const BoxHeader = props => {
    return (
	<div className="InfoBox">
	    <h3 className="BoxHeader">{props.children}</h3>
	</div>
    );
}
	      
export default App;
