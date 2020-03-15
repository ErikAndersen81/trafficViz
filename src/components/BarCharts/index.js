import React, { useState } from 'react';
import { GetData } from '../utility';
import BarChart from '../BarChart';

const BarCharts = (props) => {
    const [data, setData] = useState();
    GetData({date:props.date, simulationType:props.simulationType, setData:setData});
   
    return (
	<div className="chartsHolder">
	    <div className="charts">
		{
		    data ?
		    Object.keys(data).map( (intersection,idx) =>
			<BarChart key={idx}
			      name={intersection}
			      data={data[intersection]}/>)
		    : null
		}
	    </div>
	</div>
    );
}

export default BarCharts;
