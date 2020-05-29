import React from 'react';

const Grid = props => {
    const max = props.maxVal;
    const dateLines = [0,.25,.5,.75,1].map(i => (
	<path d={"M "+(i*props.slice*props.scalar_x) + " 0 L "+(i*props.slice*props.scalar_x)+" 100 "}
	      id={"dateLine" + i}
	      key={"dateLine" + i}
	      className="dateLine"/>));
    
    const dateLabels = [0,.25,.5,.75].map(i => (
	<text x={7 + (i*props.slice*props.scalar_x)}
	      y="105"
	      id={"dateLabel" + i}
	      key={"dateLabel" + i}
	      className="dateLabel">{prettyPrintDate(props.dates[[parseInt(i*props.slice)]])}</text>));
    
    const hLines = [0,.25,.5,.75,1].map(i => (
	<path d={"M 0 "+ (100-i*max*props.scalar_y) + " L "+(props.slice*props.scalar_x)+" "+ (100-i*max*props.scalar_y)}
	      id={"hLine" + i}
	      key={"hLine" + i}
	      className="hLine"/>));
    
    const hLabels = [0,.25,.5,.75,1].map(i => (
	<text x="0"
	      className="hLabel"
	      key={"hLabel" + i}
	      y={100-(max*i*props.scalar_y)}> {parseInt((max*i))}
	</text>));
    
    return (
	<>
	    {hLines}
	    {hLabels}
	    {dateLines}
	    {dateLabels}
	</>
    )
}

const prettyPrintDate = date => {
    if (date === undefined) return null;
    let month = parseInt(date.slice(5,7));
    let day = parseInt(date.slice(8,10));
    return day+"/"+month +" " + date.slice(11,16) 
};


export default Grid;
