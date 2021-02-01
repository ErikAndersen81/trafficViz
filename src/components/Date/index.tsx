import React from "react";

type DatePickerProps = {
  datetime: Date;
  setDatetime: React.Dispatch<React.SetStateAction<Date>>;
  min?: Date;
  max?: Date;
};

const DatePicker = (props: DatePickerProps) => {
  const { datetime, setDatetime, max: dmax, min: dmin } = { ...props };
  const max = dmax ? dmax : new Date("2019-03-30 23:59");
  const min = dmin ? dmin : new Date("2015-01-01 00:00");
  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, date] = event.target.value
      .split("-")
      .map((x) => parseInt(x));
    console.log(year, month, date);
    const newDate = new Date(datetime.toString());
    console.log(newDate.toString());
    newDate.setFullYear(year, month - 1, date);
    console.log(newDate.toString());
    if (
      newDate.valueOf() > min.valueOf() ||
      newDate.valueOf() < max.valueOf()
    ) {
      setDatetime(newDate);
    }
    event.preventDefault();
  };
  const changeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    let [hours, mins]: string[] = event.target.value.split(":");
    datetime.setHours(parseInt(hours));
    datetime.setMinutes(parseInt(mins));
    let newDate = new Date(datetime.toString());
    if (
      newDate.valueOf() > min.valueOf() ||
      newDate.valueOf() < max.valueOf()
    ) {
      setDatetime(newDate);
    }

    event.preventDefault();
  };
  return (
    <form>
      <label htmlFor="date"> Date: </label>
      <input
        type="date"
        name="date"
        value={datetime.toISOString().substring(0, 10)}
        min={min.toISOString().substring(0, 10)}
        max={max.toISOString().substring(0, 10)}
        onChange={(e) => changeDate(e)}
      />
      <br></br>
      <label htmlFor="time"> Time: </label>
      <input
        type="time"
        name="time"
        value={datetime.toLocaleTimeString().substring(0, 5)}
        onChange={(e) => changeTime(e)}
      />
    </form>
  );
};

export default DatePicker;
