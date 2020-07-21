import React, { useState } from 'react';
import DatePicker from '../Date';
import Skip from '../Skip';
import RunButton from '../RunButton';
import Map from '../Map';
import Graph from '../Graph';
import { HighlightContext, DateTimeContext } from '../Context';

import GraphOptions from '../GraphOptions';

function App() {
    /* Set default values */
    const [graphOptions, setGraphOptions] = useState(["aggregated"]);
    const [intersections, setIntersections] = useState([]);
    const [starttime, setStarttime] = useState("2016-09-01 05:00");
    const [endtime, setEndtime] = useState("2016-09-02 06:00");

    const [highlighted, setHighlighted] = useState("");
    
    const interval = {starttime:starttime,
		      setStarttime:setStarttime,
		      endtime:endtime,
		      setEndtime:setEndtime}
    
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
 	    <HighlightContext.Provider value={{highlighted:highlighted, setHighlighted:setHighlighted}}>
		<DateTimeContext.Provider value={interval} >
 		    <div className="mapAndGraphsContainer">
 			<Map handleIntersectionClick={handleIntersectionClick}
 			     handleIntersectionHover={handleIntersectionHover}/>
    			<div>
    			    <div className="GraphBox">
    				<Graph graphOptions={graphOptions}
				       intersections={intersections}
				/>
    				<GraphOptions graphOptions={graphOptions}
    					      setGraphOptions={setGraphOptions}
    				/>
     			    </div>
    			    <div className="DatetimeBox">
    				<BoxHeader>Time Frame Boundaries</BoxHeader>
    				<div className="DatetimeSelector">
    				    <p>From</p>
    				    <DatePicker datetime={starttime} setDatetime={setStarttime} max={endtime.slice(0,10)} />
    				</div>
    				<div className="DatetimeSelector">
    				    <p>To</p>
    				    <DatePicker datetime={endtime} setDatetime={setEndtime} min={starttime.slice(0,10)}/>
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
    			</div>
    		    </div>
		</DateTimeContext.Provider>
    	    </HighlightContext.Provider>
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
