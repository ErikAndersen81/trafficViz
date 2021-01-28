import React, {useState, useContext} from 'react';
import { validateDate, parseDate } from '../Date';
import { DateTimeContext } from '../Context';

const Skip = (props) => {
    const [interval, setInterval] = useState("hours");
    const {starttime, setStarttime, endtime, setEndtime} = useContext(DateTimeContext);
    
    let start = parseDate(starttime);
    let end = parseDate(endtime);
    
    const skip = (event) => {
	let value = 1;
	let key = interval
	if (interval === "week") {
	    key = "day";
	    value = 7;
	}
	value = event.target.value === "forward" ? value : value * -1;
	start[[key]] += value;
	start = validateDate(start); 
	setStarttime(start);
	end[[key]] += value;
	end = validateDate(end); 
	setEndtime(end);
	event.preventDefault();
    }
    
    return (
	<div className="DatetimeSelector">
	    <div>
		<button value="back" onClick={skip}>&laquo; Backward </button>
		<select className="DropdownBtn" name="skip" onChange={e => setInterval(e.target.value)}>
		    <option value="hours">Hour</option>
		    <option value="day">Day</option>
		    <option value="week">Week</option>
		    <option value="month">Month</option>
		    <option value="year">Year</option>
		</select>
		<button value="forward" onClick={skip}>Forward &raquo;</button>
	    </div>
	</div>
    );
}

export default Skip;
