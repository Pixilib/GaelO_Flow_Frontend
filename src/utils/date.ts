
/**
 * Format time to HH:MM(AM | PM) from hours and minutes 
 * @param {number} hours - example 12
 * @param {number} minutes  example 30
 * @returns {string} - The formatted time example 12:30 PM
 */
export const formatTime = (hours: number, minutes: number): string => {
    const date = new Date(Date.UTC(1970, 0, 1, hours, minutes));
    const timeString = date.toISOString().slice(11, 16);
    return timeString;
}

/**
 * Calculate the difference between two time strings in hours and minutes
 * @param {string} timeStart example 12:30
 * @param {string} timeEnd example 14:00
 * @returns {string} example 1:30
 */
export const timeDiff = (timeStart: string, timeEnd: string): string => {
    const timeStartArray = timeStart.split(':');
    const timeEndArray = timeEnd.split(':');
    let hours = parseInt(timeEndArray[0]) - parseInt(timeStartArray[0]);
    let minutes = parseInt(timeEndArray[1]) - parseInt(timeStartArray[1]);
    if (minutes < 0) {
        hours -= 1;
        minutes += 60;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Formats a time string for display in a human-readable format specifying hours and minutes.
 * @param {string} time - Time string in HH:MM format, e.g., "12:30".
 * @returns {string} A descriptive time format, e.g., "12 hours 30 minutes".
 */
export const formatTimeReadable = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const hourLabel = `${hours} hour${hours > 1 ? 's' : ''}`;
    const minuteLabel = `${minutes} minute${minutes > 1 ? 's' : ''}`;
    return `${hourLabel} ${minutes > 0 ? minuteLabel : ''}`.trim();
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