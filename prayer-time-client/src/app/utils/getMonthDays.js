// utils/getMonthDays.js
import dayjs from "dayjs";

export const getMonthDays = (currentDate) => {
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");

  const days = [];
  let startDay = startOfMonth.startOf("week");

  while (startDay.isBefore(endOfMonth.endOf("week"))) {
    days.push({
      date: startDay,
      isCurrentMonth: startDay.month() === currentDate.month(),
    });
    startDay = startDay.add(1, "day");
  }

  return days;
};
