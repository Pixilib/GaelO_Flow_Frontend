import moment from "moment";



/**
 * A function that calculates the difference between two dates in HH:mm format
 * @param { string } timeStart 
 * @param { string } timeEnd
 * @returns { date } difference in HH:mm format 
 */
export const timeDiff = (timeStart: string, timeEnd: string): string => {
    const format = "HH:mm";
    const startDate = moment(timeStart, format);
    let endDate = moment(timeEnd, format);
    if (endDate.isBefore(startDate)) {
        endDate.add(1, 'day');
    }
    const diff = moment.utc(moment(endDate, format).diff(moment(startDate, format)));
    return diff.format("HH:mm");
}

/**
 * Format time to HH:MM(AM | PM) from hours and minutes 
 * @param {number} hours - example 12
 * @param {number} minutes  example 30
 * @returns {string} - The formatted time example 12:30
 */
export const formatTime = (hours: number, minutes: number): string => {
    const timeString = moment({ hours, minutes }).format('hh:mm');
    return timeString;
}

/**
 * Formats a time string for display in a human-readable format specifying hours and minutes.
 * @param {string} time - Time string in HH:MM format, e.g., "12:30".
 * @returns {string} A descriptive time format, e.g., "12 hours 30 minutes" or "00 hour 1 minute".
 */
export const formatTimeReadable = (time: string): string => {
    const timeObj = moment(time, 'HH:mm');
    const hours = timeObj.hours();
    const minutes = timeObj.minutes();
    
    const hourLabel = `${hours} hour${(hours !== 1 && hours !== 0) ? 's' : ''}`;
    const minuteLabel = `${minutes} minute${minutes !== 1 && minutes !== 0 ? 's' : ''}`;

    return `${hourLabel}${minutes > 0 ? ` ${minuteLabel}` : ''}`.trim();
}

/**
 * Parses a time string into an object with hour and minute properties.
 * @param {string} timeString - The time string to parse, e.g., "12:30".
 * @returns {{hours: number, minutes: number}} An object with hour and minute properties.
 * @example
 * * const timeObj = strToHrMin("12:30");
 * * console.log(timeObj); // {hours: 12, minutes: 30}
 */
export const parseTimeString = (timeString: string): {hours: number, minutes: number} => {
    const [hours, minutes] = timeString.split(':').map(part => parseInt(part, 10));
    return {hours, minutes};
}
