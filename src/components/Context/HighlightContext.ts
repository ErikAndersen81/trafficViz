import React from 'react';
type HighlightContextT = {
    highlighted:string;
    setHighlighted:React.Dispatch<React.SetStateAction<string>>;
}
const defaultHighlight:HighlightContextT = {
    highlighted:"",
    setHighlighted: () => {},
}

const HighlightContext = React.createContext<HighlightContextT>(defaultHighlight);

export default HighlightContext;
