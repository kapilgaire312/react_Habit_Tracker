import { useState } from "react";
import { getToday, getTotalDays } from "../utils/date";

export function useWeekDates() {
  const today = getToday();

  function getDates() {
    let dates = [];
    let count = 0;
    let todayDay = today.day;

    for (let i = today.weekDay; i >= 0; i--) {
      if (todayDay - count < 1) {
        todayDay = getTotalDays(today.month)
        count = 0


      }
      dates[i] = todayDay - count;
      count += 1;
    }

    count = 1;
    todayDay = today.day;

    for (let i = today.weekDay + 1; i < 7; i++) {
      if (todayDay + count > getTotalDays(today.month + 1)) {
        todayDay = 1;
        count = 0;
      }

      dates[i] = todayDay + count;
      count += 1;
    }

    return dates;
  }

  const [dates, setDates] = useState(getDates());

  return [dates, setDates];
}
