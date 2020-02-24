import React, { useState } from 'react';
import Intersections from '../Intersections';
import SelectSource from '../SelectSource';
import Date from '../Date';
import Map from '../Map';


function App() {
    /* Use median week as default simulation */
    const [simulationType, setSimulationType] = useState('median');
    
    return (
	<>
	    <SelectSource simulation={simulationType} setSimulation={setSimulationType}/>
	    <br/>
	    <Date simulationType={simulationType} />
	    <div className="graph">
		<svg
		    width="100%"
		    height="100%"
		    viewBox="0 0 1337 1179"
		    xmlns="http://www.w3.org/2000/svg"
		    xmlnsXlink="http://www.w3.org/1999/xlink"
		>
		    <g>
			{ <Map /> }
			<Intersections simulationType={simulationType} date={"2015-12-16 13:30:00"} />
		    </g>
		</svg>
	    </div>
	</>
    );
}
	      
export default App;
