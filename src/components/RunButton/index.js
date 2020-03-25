import React, { useState, useEffect } from 'react';
import { validateDate } from '../Date';

const RunButton = (props) => {
    const [run, setRun] = useState(false);
    const className = run ? "PauseButton" : "RunButton";
    const handleClick= (e) => {
	setRun(!run);
    }
    
    useEffect( () => {
	if (run) {
	    const increment = setInterval( () => {
		let value = props.date;
		let date = {
		    year: parseInt(value.slice(0,4)),
		    month: parseInt(value.slice(5,7)),
		    day: parseInt(value.slice(8,10)),
		    hours: parseInt(value.slice(11,13)),
		    minutes: parseInt(value.slice(14,16))
		}
		date['minutes'] += 15;
		props.setDate(validateDate(date));
	    }, 100 );
	    return () => clearInterval(increment);
	}
    }, [props, props.date, run]);

    
    
    return <button onClick={handleClick} className={className} ></button>
}

export default RunButton;
