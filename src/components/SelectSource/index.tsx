import React from 'react';

const SelectSource = (props: any) => {
    return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<form>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <input type="radio"
		   id="median"
		   name="source"
		   value="median"
		   onChange={() => props.setSimulation("median")}
		   checked={props.simulation === "median"} />
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <label htmlFor="median">Median week</label>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <input type="radio"
		   id="mean"
		   name="source"
		   value="mean"
		   onChange={() => props.setSimulation("mean")}
		   checked={props.simulation === "mean"}/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <label htmlFor="mean">Mean Week</label>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <input type="radio"
		   id="raw"
		   name="source"
		   value="raw"
		   onChange={() => props.setSimulation("raw")}
		   checked={props.simulation === "raw"}/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <label htmlFor="raw">Actual Measurements</label>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <input type="radio"
		   id="upper"
		   name="source"
		   value="upper"
		   onChange={() => props.setSimulation("upper")}
		   checked={props.simulation === "upper"}/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <label htmlFor="upper">Upper bounds</label>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <input type="radio"
		   id="lower"
		   name="source"
		   value="lower"
		   onChange={() => props.setSimulation("lower")}
		   checked={props.simulation === "lower"}/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <label htmlFor="lower">Bounds</label>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <input type="radio"
		   id="filled"
		   name="source"
		   value="filled"
		   onChange={() => props.setSimulation("filled")}
		   checked={props.simulation === "filled"}/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <label htmlFor="filled">Filled with median</label>
	</form>
    )
};

export default SelectSource;
