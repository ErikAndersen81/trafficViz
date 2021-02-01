import React, { useState, useEffect } from "react";
import { useSlideTimeframe } from "../Hooks";

const RunButton = () => {
  const [run, setRun] = useState(false);
  const slide = useSlideTimeframe();
  const className = run ? "PauseButton" : "RunButton";
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setRun(!run);
  };

  useEffect(() => {
    if (run) {
      const increment = setInterval(() => {
        slide("forward");
      }, 750);
      return () => clearInterval(increment);
    }
  });

  return (
    <div>
      <button onClick={handleClick} className={className}></button>
    </div>
  );
};
export default RunButton;
