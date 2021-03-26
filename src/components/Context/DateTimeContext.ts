import React from 'react';

export type Interval = 'day' | 'week';

export type Datetime = {
  starttime: Date;
  setStarttime: React.Dispatch<React.SetStateAction<Date>>;
  interval: Interval;
  setInterval: React.Dispatch<React.SetStateAction<Interval>>;
};

export const getEndtime = (datetime: Date, interval: Interval) => {
  if (interval === 'day') {
    let newDatetime: Date = new Date(datetime.toString())
    const date = newDatetime.getDate();
    newDatetime.setDate(date + 1);
    return newDatetime;
  }
  let newDatetime: Date = new Date(datetime.toString())
  const date = newDatetime.getDate();
  newDatetime.setDate(date + 7);
  return newDatetime;
}
const DateTimeContext = React.createContext<Datetime>({
  interval: 'day',
  setInterval: () => console.log("Warning: No interval provider!"),
  starttime: new Date(),
  setStarttime: () => { console.log("Warning: No starttime provider!") }
});


export default DateTimeContext;
