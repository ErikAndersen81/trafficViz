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
    const [date, setDate] = useState("2017-02-06 13:15");
    
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
	props.date(date);
	e.preventDefault();
    };
    
    return (
	<>
	    <input value={date}
		   onChange={handleOnChange}
		   onKeyPress={handleOnKey} />
	</>
    )
    
};

export default DatePicker
