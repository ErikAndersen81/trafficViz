import React, { useContext } from 'react';
import { Circle, Tooltip } from 'react-leaflet';
import Blueprints from '../../constants/blueprints';
import { DataContext, HighlightContext } from '../Context';

const IntersectionMarkers = (props) => {
    const data = useContext(DataContext);
    if (!data) return null;
    const ints = data ? Object.keys(data.intersections).map( (intersection,idx) => (
	<IntersectionMarker key={intersection + "IntersectionMarker"}
			    name={intersection}
			    measurements={data.interval}
			    handleIntersectionClick={props.handleIntersectionClick}
			    size={data.intersections[[intersection]].size}
			    belows={data.intersections[[intersection]].belows}
			    aboves={data.intersections[[intersection]].aboves}/>)) : null;
    return (
	<div className="markers">
	    { ints ? ints : <p>error</p>}
	</div>
    );
};

const IntersectionMarker = props => {
    const blueprint = Blueprints[props.name];
    const Highlight = useContext(HighlightContext);
    if (!blueprint) return null;

    const handleIntersectionHover = event => {
	if (event.type === "mouseover") {Highlight.setHighlighted(props.name);}
	else {Highlight.setHighlighted("");}
    }
    
    /* Size is traffic intensity relative to the number of measurements */
    const radius = (props.size/props.measurements);

    /* Set gradient as percentage of outliers below and avoe means, respectively*/
    
    const aboves = parseInt((props.aboves/props.measurements)*100);
    const belows = (props.belows/props.measurements)*100;
    
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
	   <Circle center={{lat:blueprint.latitude, lng:blueprint.longitude}}
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
	       <p>Measurements &gt; &mu; + 3&sigma;: {props.aboves}</p>
	       <p>Measurements &lt; &mu; - 3&sigma;: {props.belows}</p>
	     </Tooltip>
	   </Circle>
	</>
    )
}

export default IntersectionMarkers;
