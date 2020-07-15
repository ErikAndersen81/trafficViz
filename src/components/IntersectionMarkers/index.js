import React, { useContext } from 'react';
import { Circle, Tooltip } from 'react-leaflet';
import { DataContext, HighlightContext } from '../Context';
import useData from '../Hooks/useData';

const IntersectionMarkers = React.memo((props) => {
    const [data, isLoading, error] = useData({starttime:props.starttime, endtime:props.endtime}, 'markers');
    const [coordinates, coordsAreLoading, coordsError] = useData('get', 'coordinates');
    if (!data) return null;
    const ints = data ? Object.keys(data.total_passings).map( (intersection,idx) => (
	<IntersectionMarker key={intersection + "IntersectionMarker"}
			    name={intersection}
			    measurements={data.measurements}
			    handleIntersectionClick={props.handleIntersectionClick}
			    coordinates={coordinates[[intersection]]}
			    size={data.total_passings[[intersection]]}
			    belows={data.pct_below[[intersection]]}
			    aboves={data.pct_above[[intersection]]}/>)) : null;
    return (
	<div className="markers">
	    { ints ? ints : <p>error</p>}
	</div>
    );
});

const IntersectionMarker = props => {
    const coords = props.coordinates;
    const Highlight = useContext(HighlightContext);
    if (!coords) return null;

    const handleIntersectionHover = event => {
	if (event.type === "mouseover") {Highlight.setHighlighted(props.name);}
	else {Highlight.setHighlighted("");}
    }
    
    /* Size is traffic intensity relative to the number of measurements */
    const radius = props.size/props.measurements;

    /* Set gradient as percentage of outliers below and above means, respectively */
    
    const aboves = parseInt(props.aboves*100);
    const belows = parseInt(props.belows*100);
    if (isNaN(aboves) | isNaN(belows)) return null;
    const Fill = props => (
	<svg xmlns="http://www.w3.org/2000/svg">
	  <defs>
	    <radialGradient id={'bgGradient' + aboves + belows} >
	      <stop offset={belows + '%'}  stopColor='yellow'  />
              <stop offset={belows + '%'}  stopColor='blue'  />
              <stop offset={100 - aboves + '%'} stopColor='blue'  />
	      <stop offset={100 - aboves + '%'} stopColor='red'  />
	    </radialGradient>
	  </defs>
	</svg>
    );
    
    return (
	<>
	    <Fill/> 
	    <Circle center={{lat:coords.latitude, lng:coords.longitude}}
		    radius={radius+50}
		    className="circle"
		    weight="1.5"
		    color={Highlight.highlighted === props.name ? 'white':'black'}
		    fillOpacity="0.5"
		    fillColor={"url(#bgGradient" + aboves + belows + ")"}
		    onMouseOver={handleIntersectionHover}
		    onMouseOut={handleIntersectionHover}
		    onclick={props.handleIntersectionClick}>
		<Tooltip>
		    <h3>{props.name}</h3>
		    <p>Number of passings: {props.size} </p>
		    <p>Measurements: {props.measurements}</p>
		    <p>Measurements &gt; &mu; + 3&sigma;: {props.aboves}</p>
		    <p>Measurements &lt; &mu; - 3&sigma;: {props.belows}</p>
		</Tooltip>
	    </Circle>
	</>
    )
}

export default IntersectionMarkers;
