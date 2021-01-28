import React from 'react';

const SelectVisualization = (props: any) => {
    const visualizations = {
	'barchart':'Bar Charts', 'map':'Map', 'graph':'Graph'
    }
    return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<form>
	    {
		Object.keys(visualizations).map( key =>
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		    <React.Fragment key={key}>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
			<input type="radio"
			       id={key}
			       key={key}
			       name="source"
			       value={key}
			       onChange={() => props.setVisualization(key)}
			       checked={props.visualization === key} />
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
			<label htmlFor={key}>{visualizations[key]}</label></React.Fragment>)
	    }
	</form>
    )
};

export default SelectVisualization;
