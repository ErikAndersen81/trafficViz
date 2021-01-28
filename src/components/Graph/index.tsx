import React, {useContext} from 'react';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Disturbances' was resolved to '/home/eri... Remove this comment to see the full error message
import Disturbances from './Disturbances';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Paths' was resolved to '/home/erik/IADM8... Remove this comment to see the full error message
import Paths from './Paths'
// @ts-expect-error ts-migrate(6142) FIXME: Module './Grid' was resolved to '/home/erik/IADM80... Remove this comment to see the full error message
import Grid from './Grid';
import { DateTimeContext } from '../Context';
import useData from '../Hooks/useData.js';

const Graph = (props: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'starttime' does not exist on type 'unkno... Remove this comment to see the full error message
    const {starttime, endtime} = useContext(DateTimeContext);
    const { data } = useData({starttime:starttime,
			      endtime:endtime,
			      intersections:props.intersections,
			      graphOptions:props.graphOptions}, 'data');
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    if (!data) return <BlankGraph />
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const slice = data.interval;
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const maxVal = data.maxVal !== 0 ? data.maxVal : 1;
    const scalar_x = 100/slice;
	const scalar_y = 100/maxVal;
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const paths = Object.keys(data.pathData).map( group => (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<Paths scalar_x={scalar_x}
	       scalar_y={scalar_y}
	       group={group}
	       key={"Paths" + group}
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
	       data={data.pathData[group]}/>
    ));
    const grid = (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<Grid scalar_x={scalar_x}
	      scalar_y={scalar_y}
	      slice={slice}
	      maxVal={maxVal}
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
	      dates={data.dates}/>
    );
    return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	<div className="chartWide">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <svg viewBox="-7 -10 110 120"
		 preserveAspectRatio="none"
		 height="100%"
		 width="100%">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		<g id={props.intersection + "hLines"} key={props.intersection + "hLines"}>
		    {grid}
		    {paths}
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <text strokeWidth="0"
			  fontSize="4"
			  textAnchor="right"
			  x="-6"
			  y="-5">Passings</text>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <text strokeWidth="0"
			  fontSize="7"
			  fill="cyan"
			  x={slice/2} 
			  y="-3">{props.name}</text>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <Disturbances data={data.disturbances} scalar_x={scalar_x}/>
		</g>
	    </svg>
	</div>
    </>
    )
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const BlankGraph = props => {
    return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	<>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <h3 className="chartHeader">{props.intersection}</h3>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <div className="chartWide">
	    </div>
	</>);
}


export default Graph;
