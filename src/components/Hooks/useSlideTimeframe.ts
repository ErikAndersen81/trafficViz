import { useContext } from "react";
import { DateTimeContext } from "../Context";

const useSlideTimeframe = () => {
  const {
    starttime,
    setStarttime,
    interval
  } = useContext(DateTimeContext);
  const slide = (direction: "forward" | "backward") => {
    let value = direction === "forward" ? 1 : -1;
    const newStart = new Date(starttime.toString());
    switch (interval) {
      case "day": {
        newStart.setDate(starttime.getDate() + value);
        break;
      }
      case "week": {
        newStart.setDate(starttime.getDate() + value * 7);
        break;
      }
      default: {
        // This shouldn't happen.
      }
    }
    setStarttime(newStart);
  };
  return slide;
};

export default useSlideTimeframe;