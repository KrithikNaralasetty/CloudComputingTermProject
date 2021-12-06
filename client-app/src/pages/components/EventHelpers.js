import { range } from "ramda";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";



dayjs.extend(dayOfYear)


export function getRangeOfDates(firstDate, lastDate) {
    const start = dayjs(firstDate).dayOfYear()
    const end = dayjs(lastDate).dayOfYear()
    const startYear = dayjs(firstDate).year()
    
    const days = range(start, end + 1) //should work between years now
    const dates = days.map((day) => (
        dayjs(`${start > end ? startYear + 1 : startYear}-01-01`).dayOfYear(day).format('YYYY-MM-DD')
    ))

    return dates
}

// export function createDateHour(date, hour) {
//     let i = dayjs(date).hour(hour)
    
//     return dayjs(i).format('YYYY-MM-DD HH:mm:ss')
// }

// console.log(createDateHour("2021-11-16", 10))