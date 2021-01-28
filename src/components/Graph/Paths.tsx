import React, { useContext } from 'react';
import { HighlightContext } from '../Context';
const Paths = (props: any) => {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    const paths = Object.keys(props.data).map((x, idx) => (<GroupPaths values={props.data[x]} key={"GroupPath" + x + props.group} groupName={props.group} name={x} color={colors[idx]} dash={dashes[props.group]} scalar_x={props.scalar_x} scalar_y={props.scalar_y}/>));
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<>
	    {paths}
	</>);
};
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const GroupPaths = props => {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    let paths = Object.keys(props.values).map(x => (<Path values={props.values[x]} name={props.name} key={"Paths" + x} scalar_x={props.scalar_x} scalar_y={props.scalar_y}/>));
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <g stroke={props.color} strokeDasharray={props.dash}>{paths}</g>;
};
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const Path = props => {
    const Highlight = useContext(HighlightContext);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
    const calc_x = i => parseInt(i) * props.scalar_x;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
    const calc_y = i => 100 - (parseInt(i) * props.scalar_y);
    let path = "";
    let newLine = true;
    let command = "M ";
    let readNull = false;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'y' implicitly has an 'any' type.
    props.values.forEach((y, x) => {
        readNull = y ? false : true;
        // @ts-expect-error ts-migrate(2447) FIXME: The '|' operator is not allowed for boolean types.... Remove this comment to see the full error message
        command = newLine | readNull ? "M " : "L ";
        path = path + command + calc_x(x) + " " + calc_y(y ? y : 0) + " ";
        newLine = y ? false : true;
    });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    const handleIntersectionHover = event => {
        if (event.type === "mouseover") {
            (Highlight as any).setHighlighted(props.name);
        }
        else {
            (Highlight as any).setHighlighted("");
        }
    };
    const classes = (Highlight as any).highlighted === props.name ? "path highlighted" : "path";
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<path d={path} onMouseOver={handleIntersectionHover} onMouseOut={handleIntersectionHover} className={classes} key="path"/>);
};
const colors = [
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
];
const dashes = {
    'mean': ".5 .2",
    'median': ".3"
};
export default Paths;
