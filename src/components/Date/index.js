import React, { useContext} from 'react';
import { DateTimeContext } from '../Context';

const DatePicker = (props) => {
    const [dateTime, setDateTime] = useContext(DateTimeContext)[props.time];
    const date = dateTime.slice(0,10);
    const time = dateTime.slice(11);
    return (
	<form>
	    <label htmlFor="date"> Date: </label>
	    <input type="date"
		   id={"date" + props.time}
		   name="date"
		   value={date}
		   step="1"
		   min="2015-01-01"
		   max="2019-03-30"
		   onChange={(e) => setDateTime(e.target.value + " " + time)}/>
	    <label htmlFor="time"> Time: </label>
	    <input type="time"
		   name="time"
		   id={"time" + props.time}
		   value={time}
		   min="00:00" max="24:00"
		   onChange={(e) => setDateTime( date + " " + e.target.value)}
	    />
	</form>
    )
    
};

const parseDate =  time => {return {
    year: parseInt(time.slice(0,4)),
    month: parseInt(time.slice(5,7)),
    day: parseInt(time.slice(8,10)),
    hours: parseInt(time.slice(11,13)),
    minutes: parseInt(time.slice(14,16))
}};


const validateDate = (date) => {
    /* Minutes */
    if (date.minutes/15 > 3) {
	date.hours += 1;
	date.minutes = (date.minutes) % 60;
    } else if (date.minutes < 0) {
	date.hours -= 1;
	date.minutes = 45;
    }
    if (date.minutes === 0) date.minutes = "00";

    /* Hours */
    if (date.hours/23 > 1) {
	date.day += 1;
	date.hours = date.hours % 24;
    }
    if (date.hours >= 0 && date.hours < 10) date.hours = "0" + date.hours;
    else if (date.hours < 0) {
	date.hours="23";
	date.day -= 1;
    }
    let s = 0; 
    if (date.year%4 === 0) s = 1;
    let days = 30;
    let long = new Set([1,3,5,7,8,10,12]);
    if (long.has(date.month)) days = 31;
    else if (date.month === 2) {
	days = s===1 ? 29 : 28;
    }
    if (date.day > days) {
	date.month += 1;
	date.day = date.day-days;
    } else if (date.day <= 0) {
	date.month -= 1;
	if (long.has(date.month)) date.day = 31 - date.day;
	else if (date.month === 2) date.day = s===1 ? 29 - date.day : 28 - date.day;
	else date.day=30 - date.day;
    }
    if (date.day < 10) date.day = "0"+date.day;

    if (date.month/12 > 1) {
	date.month = 1;
	date.year += 1;
    } else if (date.month === 0) {
	date.year -= 1;
	date.month=12;
    }
    if (date.month < 10) date.month = "0"+date.month;
    
    return date.year+"-"+date.month+"-"+date.day+" "+date.hours+":"+date.minutes;
}

export { validateDate, parseDate};
export default DatePicker;
