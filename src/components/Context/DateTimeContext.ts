import React from 'react';

export type SkipInterval = 'hour'|'day'|'week'|'month'|'year';

export type Datetime = {
    starttime: Date;
    setStarttime: React.Dispatch<React.SetStateAction<Date>>;
    endtime: Date;
    setEndtime: React.Dispatch<React.SetStateAction<Date>>;
    skipInterval:SkipInterval;
    setSkipInterval:React.Dispatch<React.SetStateAction<SkipInterval>>;
  };

const defaultTime:Datetime = {
  endtime:new Date("2016-09-09 12:00"),
  starttime: new Date("2016-09-09 10:00"),
  setEndtime:() => {},
  setStarttime: () => {},
  skipInterval:'hour',
  setSkipInterval: () => {}
}
  
const DateTimeContext = React.createContext<Datetime>(defaultTime);

export default DateTimeContext;
