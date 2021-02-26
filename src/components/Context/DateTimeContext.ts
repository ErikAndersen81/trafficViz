import React from 'react';

export type Interval = 'day'|'week';

export type Datetime = {
    starttime: Date;
    setStarttime: React.Dispatch<React.SetStateAction<Date>>;
    interval:Interval;
    setInterval:React.Dispatch<React.SetStateAction<Interval>>;
  };

const defaultTime:Datetime = {
  starttime: new Date("2016-09-09 04:00"),
  setStarttime: () => {},
  interval:'day',
  setInterval: () => {}
}

export const getEndtime = (datetime:Date, interval:Interval) =>  {
  if (interval === 'day') {
    let newDatetime:Date = new Date(datetime.toString())
    const date = newDatetime.getDate();
    newDatetime.setDate(date+1);
    return newDatetime;
  }
  let newDatetime:Date = new Date(datetime.toString())
  const date = newDatetime.getDate();
  newDatetime.setDate(date+7);
  return newDatetime;
}

const DateTimeContext = React.createContext<Datetime>(defaultTime);

export default DateTimeContext;
