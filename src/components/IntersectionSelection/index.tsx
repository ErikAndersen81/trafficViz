import React, { useContext } from 'react';
import colors from '../../constants/images/colors';
import { IntersectionContext } from '../Context';
import { addOrRemove } from '../Context/IntersectionContext';

const IntersectionSelection = () => {
    const { intersections } = useContext(IntersectionContext);

    return <div className="intersectionSelection"><p>Intersections: </p>
        <div >
            {intersections.map((intersection, idx) => <IntersectionLabel color={colors[idx % colors.length]} intersection={intersection} />)}
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
    return <button className="intersectionSelectionItem" title="Click to remove" onClick={() => setIntersections(addOrRemove(intersection, intersections))}>
        <span style={{ color: color }}>{intersection}</span> </button>
}

export default IntersectionSelection