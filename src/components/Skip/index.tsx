import React, { useContext } from "react";
import { DateTimeContext } from "../Context";
import { Interval } from "../Context/DateTimeContext";
import { useSlideTimeframe } from "../Hooks";

const Skip = () => {
  const { interval, setInterval } = useContext(DateTimeContext);
  const slide = useSlideTimeframe();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(event.target.value as Interval);
    event.preventDefault();
  };
  return (
    <div className="DatetimeSelector">
      <div>
        <button value="back" onClick={() => slide("backward")}>
          &laquo;
        </button>
        <select
          className="DropdownBtn"
          name="skip"
          value={interval}
          onChange={handleChange}>
          <option value="day">Day</option>
          <option value="week">Week</option>
        </select>
        <button value="forward" onClick={() => slide("forward")}>
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Skip;
