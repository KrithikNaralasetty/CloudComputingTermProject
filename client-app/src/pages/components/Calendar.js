//import { useState } from "react";
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

Calendar.propTypes = { //This is basically the parameters you need to pass when calling <Calendar />
  className: PropTypes.string,
  yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired, // e.g. [2021, 6] for June 2021
  onYearAndMonthChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func
};

export default function Calendar({
  startDate, endDate, //whether or not selected, determines if circle styles will load.
  selection, //selection state func
  className = "",
  middleDateRange,
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

//------statefulness-------////

//send details once click next is set

const selectedClickHandler = (dayObject) => {
  selection(dayObject.dateString) //passed into calendar
}

const isMiddleDate = (date) => {
  for (const day of middleDateRange) {
    if (day === date)
      return true
  }
}

const isFirstOrLastDate = (date) => {
  return (startDate === date || endDate === date)
}


//-------------------------/////
  return (
    <div className="calendar-root px-24 py-10 rounded-2xl bg-yellow-400 shadow-xl">

      <div className="navigation-header flex flex-row space-x-12 justify-center text-white">
        <BiChevronLeft className="text-6xl hover:text-gray-500" onClick={handleMonthNavBackButtonClick} />
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
        <BiChevronRight className="text-6xl hover:text-gray-500" onClick={handleMonthNavForwardButtonClick} />
      </div>

        {/*------------Days of Week--------------*/}

      <div className="days-of-week grid grid-cols-7 text-2xl my-4 container text-white">
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={classNames("day-of-week-header-cell p-1", {
              "text-gray-500": [6, 0].includes(index) //if it's a weekend day 0: Sunday, or 6: Saturday
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
            className={classNames("day-grid-item-container flex flex-col relative p-2 hover:text-opacity-50", {
              "weekend-day": isWeekendDay(day.dateString), //if true, then add class to list
              "text-white text-opacity-100": day.isCurrentMonth, // if is current month, add those classes to list. true false
            
            })}
          >
            <div onClick={() => selectedClickHandler(day)} 
            className={classNames("day-content-wrapper relative min-h-0 p-4", {
              "bg-blue-900 rounded-full shadow-md": isFirstOrLastDate(day.dateString),
              "border-2 rounded-full border-dotted border-blue-900": isMiddleDate(day.dateString)
              
            })}>
              {renderDay(day)}
            </div>
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
    <div className="day-grid-item-header cursor-pointer">{calendarDayObject.dayOfMonth}</div>
  ); //if selected
}