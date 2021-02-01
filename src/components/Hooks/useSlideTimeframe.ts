import { useContext } from "react";
import { DateTimeContext } from "../Context";

const useSlideTimeframe = () => {
  const {
    starttime,
    setStarttime,
    endtime,
    setEndtime,
    skipInterval,
  } = useContext(DateTimeContext);
  const slide = (direction: "forward" | "backward") => {
    let value = direction === "forward" ? 1 : -1;
    const [newStart, newEnd] = [
      new Date(starttime.toString()),
      new Date(endtime.toString()),
    ];
    switch (skipInterval) {
      case "hour": {
        newStart.setHours(starttime.getHours() + value);
        newEnd.setHours(endtime.getHours() + value);
        break;
      }
      case "day": {
        newStart.setDate(starttime.getDate() + value);
        newEnd.setDate(endtime.getDate() + value);
        break;
      }
      case "week": {
        newStart.setDate(starttime.getDate() + value * 7);
        newEnd.setDate(endtime.getDate() + value * 7);
        break;
      }
      case "month": {
        newStart.setMonth(starttime.getMonth() + value);
        newEnd.setMonth(endtime.getMonth() + value);
        break;
      }
      case "year": {
        newStart.setFullYear(starttime.getFullYear() + value);
        newEnd.setFullYear(endtime.getFullYear() + value);
        break;
      }
      default: {
        // This shouldn't happen.
      }
    }
    setStarttime(newStart);
    setEndtime(newEnd);
  };
  return slide;
};

export default useSlideTimeframe;