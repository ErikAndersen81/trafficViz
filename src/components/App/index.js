import React, { useState } from 'react';
import SelectSource from '../SelectSource';
import SelectVisualization from '../SelectVisualization';
import DatePicker from '../Date';
import Map from '../Map';
import BarCharts from '../BarCharts';


function App() {
    /* Set default values */
    const first = "2017-02-06 13:15:00";
    const last = "2019-03-26 10:00:00";
    const [simulationType, setSimulationType] = useState('median');
    const [visualizationType, setVisualizationType] = useState('map');
    const [date, setDate] = useState("2017-02-07 18:45");

    return (
	<>
	  <div className="Header">
	    <div>
	      <SelectVisualization visualization={visualizationType}
				   setVisualization={setVisualizationType}/>
	      <SelectSource simulation={simulationType}
			    setSimulation={setSimulationType}/>
	      </div>
	    <div>
	      <p className="Note" ><small>Current date range for "actual" measurements is from {first} to {last} </small></p>
	      <DatePicker date={date} setDate={setDate} />
	    </div>
	  </div>
	  {
	      visualizationType === 'barchart' ? <BarCharts simulationType={simulationType}
							    date={date} />: null
	  }
	  {
	      visualizationType === 'map' ? <Map simulationType={simulationType}
						 date={date} />: null
	  }
	</>
    );
}
	      
export default App;
