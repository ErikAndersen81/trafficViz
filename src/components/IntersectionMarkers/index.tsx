import React, { useContext } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Circle, Tooltip } from 'react-leaflet';
import { DateTimeContext, HighlightContext } from '../Context';
import useData from '../Hooks/useData';
const IntersectionMarkers = React.memo((props) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'starttime' does not exist on type 'unkno... Remove this comment to see the full error message
    const { starttime, endtime } = useContext(DateTimeContext);
    const { data } = useData({ starttime: starttime, endtime: endtime }, 'markers');
    const { data: coordinates } = useData('get', 'coordinates');
    if (!data)
        return null;
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const ints = data ? Object.keys(data.total_passings).map((intersection, idx) => (<IntersectionMarker key={intersection + "IntersectionMarker"} name={intersection} measurements={data.measurements} handleIntersectionClick={(props as any).handleIntersectionClick} coordinates={coordinates ? coordinates[[intersection]] : null} size={data.total_passings[[intersection]]} belows={data.pct_below[[intersection]]} aboves={data.pct_above[[intersection]]}/>)) : null;
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<div className="markers">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    {ints ? ints : <p>error</p>}
	</div>);
});
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const IntersectionMarker = props => {
    const coords = props.coordinates;
    const Highlight = useContext(HighlightContext);
    if (!coords)
        return null;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    const handleIntersectionHover = event => {
        if (event.type === "mouseover") {
            (Highlight as any).setHighlighted(props.name);
        }
        else {
            (Highlight as any).setHighlighted("");
        }
    };
    /* Size is traffic intensity relative to the number of measurements */
    const radius = props.size / props.measurements;
    /* Set gradient as percentage of outliers below and above means, respectively */
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    const aboves = parseInt(props.aboves * 100);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    const belows = parseInt(props.belows * 100);
    // @ts-expect-error ts-migrate(2447) FIXME: The '|' operator is not allowed for boolean types.... Remove this comment to see the full error message
    if (isNaN(aboves) | isNaN(belows))
        return null;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    const Fill = props => (<svg xmlns="http://www.w3.org/2000/svg">
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	  <defs>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <radialGradient id={'bgGradient' + aboves + belows}>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	      <stop offset={belows + '%'} stopColor='yellow'/>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <stop offset={belows + '%'} stopColor='blue'/>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <stop offset={100 - aboves + '%'} stopColor='blue'/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	      <stop offset={100 - aboves + '%'} stopColor='red'/>
	    </radialGradient>
	  </defs>
	</svg>);
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <Fill /> 
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
	    <Circle center={{ lat: coords.latitude, lng: coords.longitude }} radius={radius + 50} className="circle" weight="1.5" color={(Highlight as any).highlighted === props.name ? 'white' : 'black'} fillOpacity="0.5" fillColor={"url(#bgGradient" + aboves + belows + ")"} onMouseOver={handleIntersectionHover} onMouseOut={handleIntersectionHover} onclick={props.handleIntersectionClick}>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		<Tooltip>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <h3>{props.name}</h3>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <p>Number of passings: {props.size} </p>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <p>Measurements: {props.measurements}</p>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <p>Measurements &gt; &mu; + 3&sigma;: {props.aboves}</p>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
		    <p>Measurements &lt; &mu; - 3&sigma;: {props.belows}</p>
		</Tooltip>
	    </Circle>
	</>);
};
export default IntersectionMarkers;
