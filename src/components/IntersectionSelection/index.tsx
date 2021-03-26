import React, { useContext } from 'react';
import colors from '../../constants/images/colors';
import { IntersectionContext } from '../Context';
import { addOrRemove } from '../Context/IntersectionContext';

const IntersectionSelection = () => {
    const { intersections } = useContext(IntersectionContext);

    return <div>
        <h3>Selected intersections</h3>
        <div className="intersectionSelection">
            {intersections.map((intersection, idx) => <IntersectionLabel color={colors[idx]} intersection={intersection} />)}
        </div>
    </div>
}

type IntersectionLabelProps = {
    intersection: string;
    color: string;
}

const IntersectionLabel = (props: IntersectionLabelProps) => {
    const { intersections, setIntersections } = useContext(IntersectionContext);
    const { intersection, color } = { ...props };
    return <button title="Click to remove" onClick={() => setIntersections(addOrRemove(intersection, intersections))}>
        <span style={{ color: color }}>{intersection} &#69707; </span> </button>
}

export default IntersectionSelection