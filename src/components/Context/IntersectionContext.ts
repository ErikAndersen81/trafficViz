import React from 'react';

export type IntersectionSelection = {
  intersections: Array<string>;
  setIntersections: React.Dispatch<React.SetStateAction<Array<string>>>;
  highlighted: string;
  setHighlighted: React.Dispatch<React.SetStateAction<string>>;
};


const IntersectionContext = React.createContext<IntersectionSelection>({
  intersections: [],
  highlighted: '',
  setIntersections: () => { console.log("Warning: No intersections provider!") },
  setHighlighted: () => { console.log("Warning: No highlight provider!") },
});

export const addOrRemove = (intersection: string, intersections: Array<string>): Array<string> => {
  const idx = intersections.indexOf(intersection);
  if (idx !== -1) return [...intersections].slice(0, idx).concat([...intersections].slice(idx + 1))
  else return [...intersections, intersection]
}

export default IntersectionContext;
