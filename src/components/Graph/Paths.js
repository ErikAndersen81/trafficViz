
import React, { useContext } from 'react';
import { HighlightContext } from '../Context';

const Paths = props => {
    const paths = Object.keys(props.data).map( (x, idx) => ( <GroupPaths values={props.data[x]}
								       key={"GroupPath"+x + props.group}
								       groupName={props.group}
								       name={x}
								       color={colors[idx]}
								       dash={dashes[props.group]}
								       scalar_x={props.scalar_x}
								       scalar_y={props.scalar_y}/>
    ));
    return (
	<>
	    { paths }
	</>
    );
};

const GroupPaths = props => {
    let paths = Object.keys(props.values).map( x => (
	<Path values={props.values[x]}
	      name={props.name}
	      key={"Paths"+x}
	      scalar_x={props.scalar_x}
	      scalar_y={props.scalar_y}/>));
    return <g stroke={props.color} strokeDasharray={props.dash}>{paths}</g>;
}

const Path = props => {
    const Highlight = useContext(HighlightContext);
    const calc_x = i =>  parseInt(i) * props.scalar_x;
    const calc_y = i => 100 - (parseInt(i) * props.scalar_y);
    let path = "";
    let newLine = true;
    let command = "M ";
    let readNull = false;
    props.values.forEach( (y,x) => {
	readNull = y ? false : true;
	command = newLine | readNull ? "M " : "L ";
	path = path + command +calc_x(x)+" "+calc_y(y ? y : 0)+" ";
	newLine = y ? false : true;
    });

    const handleIntersectionHover = event => {
	if (event.type === "mouseover") {Highlight.setHighlighted(props.name);}
	else {Highlight.setHighlighted("");}
    }

    const classes = Highlight.highlighted === props.name ? "path highlighted" : "path";
    
    return (<path d={path}
	    onMouseOver={handleIntersectionHover}
	    onMouseOut={handleIntersectionHover}
	    className={classes}
	    key="path"/> );
}


const colors=[
    "#558b2f",
    "#f8c471",
    "#a5d6a7",
    "#ef9a9a",
    "#a9cce3",
    "#FFF9c4",
    "#616161",
    "#bbdefb",
    "#ffcdd2",
    "#33691e"   
]

const dashes = {
    'mean':".5 .2",
    'median':".3"
}

export default Paths;
