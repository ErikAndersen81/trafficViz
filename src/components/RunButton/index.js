import React, { useState, useEffect, useContext } from 'react';
import { DateTimeContext } from '../Context';
import { validateDate, parseDate } from '../Date';

const RunButton = (props) => {
    const [run, setRun] = useState(false);
    const [starttime, setStarttime] = useContext(DateTimeContext).starttime;
    const [endtime, setEndtime] = useContext(DateTimeContext).endtime;
    const className = run ? "PauseButton" : "RunButton";
    const handleClick= (e) => {
	setRun(!run);
    }
    
    useEffect( () => {
	if (run) {
	    const increment = setInterval( () => {
		let start = parseDate(starttime);
		let end = parseDate(endtime);
		start['minutes'] += 15;
		end['minutes'] += 15;

		console.log(start);
		console.log(validateDate(start));
		
		setStarttime(validateDate(start));
		setEndtime(validateDate(end));
	    }, 750 );
	    return () => clearInterval(increment);
	}
    }, [run]);
    return <button onClick={handleClick} className={className} ></button>
}

export default RunButton;
