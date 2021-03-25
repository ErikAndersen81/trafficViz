import React, { useContext } from "react";
import { DateTimeContext } from "../Context";
import Skip from "../Skip";

const Timeframe = () => {
  return (
    <div className="DatetimeBox">
      <div className="DatetimeBoxItem">
        <span>Timeframe:</span>
      </div>
      <div className="DatetimeBoxItem">
        <Skip /></div>
      <div className="DatetimeBoxItem">
        <DatePicker />
      </div>
    </div>
  );
};

type DatePickerProps = {
  min?: Date;
  max?: Date;
};

const DatePicker = (props: DatePickerProps) => {
  const { max: dmax, min: dmin } = { ...props };
  const { starttime, setStarttime } = useContext(DateTimeContext);
  const max = dmax ? dmax : new Date("2019-03-30 23:59");
  const min = dmin ? dmin : new Date("2015-01-01 00:00");
  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, date] = event.target.value
      .split("-")
      .map((x) => parseInt(x));
    const newDate = new Date(starttime.toString());
    newDate.setFullYear(year, month - 1, date);
    if (
      newDate.valueOf() > min.valueOf() ||
      newDate.valueOf() < max.valueOf()
    ) {
      setStarttime(newDate);
    }
    event.preventDefault();
  };
  const changeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    let [hours, mins]: string[] = event.target.value.split(":");
    starttime.setHours(parseInt(hours));
    starttime.setMinutes(parseInt(mins));
    let newDate = new Date(starttime.toString());
    if (
      newDate.valueOf() > min.valueOf() ||
      newDate.valueOf() < max.valueOf()
    ) {
      setStarttime(newDate);
    }

    event.preventDefault();
  };
  return (
    <form>
      <input
        type="date"
        name="date"
        value={starttime.toISOString().substring(0, 10)}
        min={min.toISOString().substring(0, 10)}
        max={max.toISOString().substring(0, 10)}
        onChange={(e) => changeDate(e)}
      />
      <input
        type="time"
        name="time"
        value={starttime.toTimeString().slice(0, 5)}
        onChange={(e) => changeTime(e)}
      />
    </form>
  );
};

export default Timeframe;
