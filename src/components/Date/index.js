import React, { useState } from 'react';

/* This component is used in conjuction with Date and will translate median dates to week days */
/* const formatDate = (date) => {
 *     const dayDate = date.slice(8,10);
 *     var day;
 *     switch (dayDate) {
 * 	case "01":
 * 	    day = "Thursday";
 * 	    break;
 * 	case "02":
 * 	    day = "Friday";
 * 	    break;
 * 	case "03":
 * 	    day = "Saturday";
 * 	    break;
 * 	case "04":
 * 	    day = "Sunday";
 * 	    break;
 * 	case "05":
 * 	    day = "Monday";
 * 	    break;
 * 	case "06":
 * 	    day = "Tuesday";
 * 	    break;
 * 	case "07":
 * 	    day = "Wednesday";
 * 	    break;
 * 	default:
 * 	    day = "You should have checked the median dates";
 *     }
 *     return day + date.slice(10);
 * }
 *  
 */

/* This component can render the date by collecting a sample from the server */

/* const Date = (props) => {
 *     const resource = "http://127.0.0.1:5000/K071/" + props.simulationType;
 *     const key = props.simulationType === "real" ? "K071" : "Unnamed: 0";
 *     const [date, setDate] = useState(null);
 *     
 *     useEffect( () => {
 *   	fetch(resource).then(
 * 	    (response) => {
 * 		return response.json();
 * 	    }).then(
 * 		(jsonData) => {
 * 		    const formattedDate = props.simulationType === "real" ?
 * 					  jsonData[key] :
 * 					  formatDate(jsonData[key]);
 * 		    setDate(formattedDate);
 *  		});
 *     });
 *     return (
 *      	<>
 * 	    <DatePicker date={setDate} />
 * 	    <p>{date}</p>
 * 	</>);
 * }; 
 *  */

const DatePicker = (props) => {
    const [date, setDate] = useState(props.date);
    
    const handleOnChange = e => {
	setDate(e.target.value);
	e.preventDefault();
    };

    const handleOnKey = e => {
	if (e.key !== "Enter") return;
	/* Do we need to implement verification of date? */
	/* const value = e.target.value;
	   const year = value.slice(0,4);
	   const month = value.slice(5,7);
	   const day = value.slice(8,10);
	   const hours = value.slice(11,13);
	   const minutes = value.slice(14,16);
	   console.log(year +" "+month+" "+day+" "+hours+":"+minutes); */
	props.setDate(date);
	e.preventDefault();
    };
    
    return (
	<div className="DatePicker">
	    <input className="DateField" value={date}
		   onChange={handleOnChange}
		   onKeyPress={handleOnKey} />
	    <Forward date={date} setDate={setDate} handler={props.setDate} />
	</div>
    )
    
};


const Forward = (props) => {
    
    const nextTime = (event) => {
	let value = props.date;
	let date = {
	    year: parseInt(value.slice(0,4)),
	    month: parseInt(value.slice(5,7)),
	    day: parseInt(value.slice(8,10)),
	    hours: parseInt(value.slice(11,13)),
	    minutes: parseInt(value.slice(14,16))
	}
	if (event.target.name === "week") {
	    date.day += parseInt(event.target.value);
	} else {
	    date[[event.target.name]] += parseInt(event.target.value);
	}
	date = validateDate(date);
	props.setDate(date);
	props.handler(date);
	event.preventDefault();
    }
    return (
	<div className="DateButtons">
	    <button className="DateButton" onClick={nextTime} name="minutes" value={15}>+15 m</button>
	    <button className="DateButton" onClick={nextTime} name="hours" value={1}>+1 h</button>
	    <button className="DateButton" onClick={nextTime} name="day" value={1}>+1 d</button>
	    <button className="DateButton" onClick={nextTime} name="week" value={7}>+1 w</button>
	    <button className="DateButton" onClick={nextTime} name="month" value={1}>+1 m</button>
	    <button className="DateButton" onClick={nextTime} name="year" value={1}>+1 y</button>
	    
	    <button className="DateButton" onClick={nextTime} name="minutes" value={-15}>-15 m</button>
	    <button className="DateButton" onClick={nextTime} name="hours" value={-1}>-1 h</button>
	    <button className="DateButton" onClick={nextTime} name="day" value={-1}>-1 d</button>
	    <button className="DateButton" onClick={nextTime} name="week" value={-7}>-1 w</button>
	    <button className="DateButton" onClick={nextTime} name="month" value={-1}>-1 m</button>
	    <button className="DateButton" onClick={nextTime} name="year" value={-1}>-1 y</button>
	</div>
    );
}

const validateDate = (date) => {
    
    if (date.minutes/15 > 3) {
	date.hours += 1;
	date.minutes = (date.minutes) % 60;
    } else if (date.minutes < 0) {
	date.hours -= 1;
	date.minutes = 45;
    }
    if (date.minutes === 0) date.minutes = "00";
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

export { validateDate };
export default DatePicker;
