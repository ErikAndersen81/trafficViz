import React, { useContext } from "react";
import { DateTimeContext } from "../Context";
import { SkipInterval } from "../Context/DateTimeContext";
import { useSlideTimeframe } from "../Hooks";

const Skip = () => {
  const { skipInterval, setSkipInterval } = useContext(DateTimeContext);
  const slide = useSlideTimeframe();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSkipInterval(event.target.value as SkipInterval);
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
          value={skipInterval}
          onChange={handleChange}>
          <option value="hour">Hour</option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <button value="forward" onClick={() => slide("forward")}>
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Skip;
