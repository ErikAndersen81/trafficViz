import React, { useContext} from 'react';
import { DateTimeContext } from '../Context';

const DatePicker = (props) => {
    const [dateTime, setDateTime] = useContext(DateTimeContext)[props.time];
    const [ date, time ] = dateTime.split(" ");
    const max = props.max ? props.max : "2019-03-30";
    const min = props.min ? props.min : "2015-01-01";
    return (
	<form>
	    <label htmlFor="date"> Date: </label>
	    <input type="date"
		   id={"date" + props.time}
		   name="date"
		   value={date}
		   step="1"
		   min={min}
		   max={max}
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

// const parseDate =  time => {
//     return {
// 	year: parseInt(time.slice(0,4)),
// 	month: parseInt(time.slice(5,7)),
// 	day: parseInt(time.slice(8,10)),
// 	hours: parseInt(time.slice(11,13)),
// 	minutes: parseInt(time.slice(14,16))
//     }};

const parseDate =  datetime => {
    let [date, time] = datetime.split(" ");
    let [year, month, day] = date.split("-").map(x => parseInt(x) | 0);
    let [hours, minutes] = time.split(":").map(x => parseInt(x) | 0);
    return {
	year: year,
	month: month,
	day: day,
	hours: hours, 
	minutes: minutes
    }};


const validateDate = (date) => {
    console.log(date);
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
    let leapYear = false; 
    if (date.year%4 === 0) leapYear = true;
    let days = 30;
    let longMonths = new Set([1,3,5,7,8,10,12]);
    if (longMonths.has(date.month)) days = 31;
    else if (date.month === 2) {
	days = leapYear ? 29 : 28;
    }
    if (date.day > days) {
	date.month += 1;
	date.day = date.day-days;
    } else if (date.day <= 0) {
	date.month -= 1;
	if (longMonths.has(date.month)) date.day = 31 + date.day;
	else if (date.month === 2) date.day = leapYear ? 29 + date.day : 28 + date.day;
	else date.day= 30 + date.day;
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
