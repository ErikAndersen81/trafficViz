import React, { useState, useEffect, useContext } from 'react';
import { DateTimeContext } from '../Context';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Date' was resolved to '/home/erik/IADM8... Remove this comment to see the full error message
import { validateDate, parseDate } from '../Date';
const RunButton = (props: any) => {
    const [run, setRun] = useState(false);
    const [starttime, setStarttime] = (useContext as any)(DateTimeContext).starttime;
    const [endtime, setEndtime] = (useContext as any)(DateTimeContext).endtime;
    const className = run ? "PauseButton" : "RunButton";
    const handleClick = (e: any) => {
        setRun(!run);
    };
    useEffect(() => {
        if (run) {
            const increment = setInterval(() => {
                let start = parseDate(starttime);
                let end = parseDate(endtime);
                start['minutes'] += 15;
                end['minutes'] += 15;
                console.log(start);
                console.log(validateDate(start));
                setStarttime(validateDate(start));
                setEndtime(validateDate(end));
            }, 750);
            return () => clearInterval(increment);
        }
    }, [endtime, run, setEndtime, setStarttime, starttime]);
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <button onClick={handleClick} className={className}></button>;
};
export default RunButton;
