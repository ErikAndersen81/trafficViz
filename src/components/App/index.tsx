import React, { useState } from 'react';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Date' was resolved to '/home/erik/IADM8... Remove this comment to see the full error message
import DatePicker from '../Date';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Skip' was resolved to '/home/erik/IADM8... Remove this comment to see the full error message
import Skip from '../Skip';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../RunButton' was resolved to '/home/erik/... Remove this comment to see the full error message
import RunButton from '../RunButton';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Map' was resolved to '/home/erik/IADM80... Remove this comment to see the full error message
import Map from '../Map';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Graph' was resolved to '/home/erik/IADM... Remove this comment to see the full error message
import Graph from '../Graph';
import { HighlightContext, DateTimeContext } from '../Context';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../GraphOptions' was resolved to '/home/er... Remove this comment to see the full error message
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
    
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    const handleIntersectionClick = event => {
	const key = event.target.options.children._owner.key;
	const intersection = key.slice(0,key.indexOf('I'))
	if (intersections.find(x => intersection === x)) {
	    setIntersections(intersections.filter(x => x !== intersection));
	} else {
// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
	    setIntersections(intersections.concat([intersection]));
	}
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    const handleIntersectionHover = event => {
	const key = event.target.options.children._owner.key;
	console.log(event.type);
	console.log(key);
	if (event.type === "mouseover") {};
    }

    
    return (
 // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
 	    <HighlightContext.Provider value={{highlighted:highlighted, setHighlighted:setHighlighted}}>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		<DateTimeContext.Provider value={interval} >
 {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
 		    <div className="mapAndGraphsContainer">
 {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
 			<Map handleIntersectionClick={handleIntersectionClick}
 			     handleIntersectionHover={handleIntersectionHover}/>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    			<div>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    			    <div className="GraphBox">
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				<Graph graphOptions={graphOptions}
				       intersections={intersections}
				/>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				<GraphOptions graphOptions={graphOptions}
    					      setGraphOptions={setGraphOptions}
    				/>
     			    </div>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    			    <div className="DatetimeBox">
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				<BoxHeader>Time Frame Boundaries</BoxHeader>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				<div className="DatetimeSelector">
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				    <p>From</p>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				    <DatePicker datetime={starttime} setDatetime={setStarttime} max={endtime.slice(0,10)} />
    				</div>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				<div className="DatetimeSelector">
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				    <p>To</p>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				    <DatePicker datetime={endtime} setDatetime={setEndtime} min={starttime.slice(0,10)}/>
    				</div>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				<div>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				    <BoxHeader>Move Time Frame</BoxHeader>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				    <div className="DatetimeSelector">
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    					<p>Step through time</p>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    					<Skip />
    				    </div>
    				</div>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				{null ? <div>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				    <BoxHeader>Automatic Time Skip</BoxHeader>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    				    <RunButton />
    				</div> : null }
    			    </div>
    			</div>
    		    </div>
		</DateTimeContext.Provider>
    	    </HighlightContext.Provider>
    );
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const BoxHeader = props => {
    return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<div className="InfoBox">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <h3 className="BoxHeader">{props.children}</h3>
	</div>
    );
}
	      
export default App;
