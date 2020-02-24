import React, {useEffect, useState } from 'react';

const formatDate = (date) => {
    const dayDate = date.slice(8,10);
    var day;
    switch (dayDate) {
	case "01":
	    day = "Thursday";
	    break;
	case "02":
	    day = "Friday";
	    break;
	case "03":
	    day = "Saturday";
	    break;
	case "04":
	    day = "Sunday";
	    break;
	case "05":
	    day = "Monday";
	    break;
	case "06":
	    day = "Tuesday";
	    break;
	case "07":
	    day = "Wednesday";
	    break;
	default:
	    day = "You should have checked the median dates";
    }
    return day + date.slice(10);
}

const Date = (props) => {
    const resource = "http://127.0.0.1:5000/K071/" + props.simulationType;
    const key = props.simulationType === "real" ? "K071" : "Unnamed: 0";
    const [date, setDate] = useState(null);

    useEffect( () => {
	fetch(resource).then(
	    /* extract data from response and pass it on */
	    (response) => {
		return response.json();
	    }).then(
		(jsonData) => {
		    const formattedDate = props.simulationType === "real" ?
					  jsonData[key] :
					  formatDate(jsonData[key]);
		    setDate(formattedDate);
		});
    });
    return <p>{date}</p>;
};

export default Date
