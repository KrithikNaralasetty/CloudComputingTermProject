import PropTypes from "prop-types";
import classNames from "classnames";
import {
  daysOfWeek,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  isWeekendDay,
  getMonthDropdownOptions,
  getYearDropdownOptions
} from "./Helpers";

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

Calendar.propTypes = {
  className: PropTypes.string,
  yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired, // e.g. [2021, 6] for June 2021
  onYearAndMonthChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func
};
export default function Calendar({
  className = "",
  yearAndMonth = [2021, 9],
  onYearAndMonthChange,
  renderDay = () => null
}) {
  const [year, month] = yearAndMonth;

  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays); //returns an array of objects representing each day in the specified month/year
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthSelect = (evt) => {
    let nextYear = year;
    let nextMonth = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleYearSelect = (evt) => {
    let nextMonth = month;
    let nextYear = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  return (
    <div className="calendar-root px-24 py-10 rounded-2xl bg-yellow-400 shadow-xl">

      <div className="navigation-header flex flex-row space-x-12 justify-center text-white">
        <BiChevronLeft className="text-6xl" onClick={handleMonthNavBackButtonClick} />
        <select
          className="month-select text-3xl border-none bg-yellow-400"
          value={month}
          onChange={handleMonthSelect}
        >
          {getMonthDropdownOptions().map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          className="year-select text-3xl border-none bg-yellow-400"
          value={year}
          onChange={handleYearSelect}
        >
          {getYearDropdownOptions(year).map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <BiChevronRight className="text-6xl" onClick={handleMonthNavForwardButtonClick} />
      </div>

        {/*------------Days of Week--------------*/}

      <div className="days-of-week grid grid-cols-7 text-2xl my-4 container text-white">
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={classNames("day-of-week-header-cell p-1", {
              "text-gray-500": [6, 0].includes(index)
            })}
          >
            {day}
          </div>
        ))}
      </div>

        {/*------------Grid--------------*/}     

      <div className="days-grid grid grid-cols-7 h-full text-gray-500 sm:text-xl md:text-2xl lg:text-4xl font-light text-opacity-50">
        {calendarGridDayObjects.map((day) => (
          <div
            key={day.dateString}
            className={classNames("day-grid-item-container flex flex-col relative p-5 hover:text-opacity-50", {
              "weekend-day": isWeekendDay(day.dateString),
              "text-white text-opacity-100": day.isCurrentMonth
            })}
          >
            <div className="day-content-wrapper relative min-h-0">{renderDay(day)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

CalendarDayHeader.propTypes = {
  calendarDayObject: PropTypes.object.isRequired
};
export function CalendarDayHeader({ calendarDayObject }) {
  return (
    <div className="day-grid-item-header">{calendarDayObject.dayOfMonth}</div>
  );
}