import React from 'react';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Date' was resolved to '/home/erik/IADM8... Remove this comment to see the full error message
import { prettyPrintDate } from '../Date';
const Grid = (props: any) => {
    const max = props.maxVal;
    const dateLines = [0,.25,.5,.75,1].map(i => (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<path d={"M "+(i*props.slice*props.scalar_x) + " 0 L "+(i*props.slice*props.scalar_x)+" 100 "}
	      id={"dateLine" + i}
	      key={"dateLine" + i}
	      className="dateLine"/>));
    
    const dateLabels = [0,.25,.5,.75].map(i => (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<text x={7 + (i*props.slice*props.scalar_x)}
	      y="105"
	      id={"dateLabel" + i}
	      key={"dateLabel" + i}
// @ts-expect-error ts-migrate(2538) FIXME: Type 'number[]' cannot be used as an index type.
	      className="dateLabel">{prettyPrintDate(props.dates[[parseInt(i*props.slice)]])}</text>));
    
    const hLines = [0,.25,.5,.75,1].map(i => (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<path d={"M 0 "+ (100-i*max*props.scalar_y) + " L "+(props.slice*props.scalar_x)+" "+ (100-i*max*props.scalar_y)}
	      id={"hLine" + i}
	      key={"hLine" + i}
	      className="hLine"/>));
    
    const hLabels = [0,.25,.5,.75,1].map(i => (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<text x="0"
	      className="hLabel"
	      key={"hLabel" + i}
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
	      y={100-(max*i*props.scalar_y)}> {parseInt((max*i))}
	</text>));
    
    return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<>
	    {hLines}
	    {hLabels}
	    {dateLines}
	    {dateLabels}
	</>
    )
}


export default Grid;
