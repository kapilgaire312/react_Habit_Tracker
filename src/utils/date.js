
export function getToday() {
  const date = new Date();
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    weekDay: date.getDay()

  }

}

export function getTotalDays(month) {
  const today = getToday();
  const date = new Date(today.year, month, 0);
  const totaldays = date.getDate()



  return totaldays

}
