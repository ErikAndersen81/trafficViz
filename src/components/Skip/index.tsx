import React, {useState, useContext} from 'react';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Date' was resolved to '/home/erik/IADM8... Remove this comment to see the full error message
import { validateDate, parseDate } from '../Date';
import { DateTimeContext } from '../Context';

const Skip = (props: any) => {
    const [interval, setInterval] = useState("hours");
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'starttime' does not exist on type 'unkno... Remove this comment to see the full error message
    const {starttime, setStarttime, endtime, setEndtime} = useContext(DateTimeContext);
    
    let start = parseDate(starttime);
    let end = parseDate(endtime);
    
    const skip = (event: any) => {
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
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<div className="DatetimeSelector">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <div>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		<button value="back" onClick={skip}>&laquo; Backward </button>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		<select className="DropdownBtn" name="skip" onChange={e => setInterval(e.target.value)}>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <option value="hours">Hour</option>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <option value="day">Day</option>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <option value="week">Week</option>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <option value="month">Month</option>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <option value="year">Year</option>
		</select>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		<button value="forward" onClick={skip}>Forward &raquo;</button>
	    </div>
	</div>
    );
}

export default Skip;
