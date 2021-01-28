import React from 'react';

const GraphOptions = (props: any) => {
    const meanChecked = props.graphOptions.indexOf('mean') > -1;
    const medianChecked = props.graphOptions.indexOf('median') > -1;
    const aggregatedChecked = props.graphOptions.indexOf('aggregated') > -1;
    const disturbancesChecked = props.graphOptions.indexOf('disturbances') > -1;
    const change = (event: any) => {
	if (event.target.checked){
	    let dts = props.graphOptions.concat([event.target.value]);
	    props.setGraphOptions(dts);
	} else {
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'x' implicitly has an 'any' type.
	    let dts = props.graphOptions.filter(x => x !== event.target.value);
	    props.setGraphOptions(dts);
	}
    }
    return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<form onChange={change}>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <input type="checkbox"
		   id="mean"
		   name="mean"
		   value="mean"
		   defaultChecked = {meanChecked}/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <label htmlFor="mean">Mean </label>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <input type="checkbox"
		   id="median"
		   name="median"
		   value="median"
		   defaultChecked = {medianChecked}/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <label htmlFor="median">Median </label>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <input type="checkbox"
		   id="aggregated"
		   name="aggregated"
		   value="aggregated"
		   defaultChecked = {aggregatedChecked}/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <label htmlFor="aggregated">Aggregated </label>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <input type="checkbox"
		   id="disturbances"
		   name="disturbances"
		   value="disturbances"
		   defaultChecked = {disturbancesChecked}/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <label htmlFor="disturbances">Disturbances </label>
	</form>)
}

export default GraphOptions;
