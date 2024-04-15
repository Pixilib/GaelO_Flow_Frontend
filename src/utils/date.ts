
/**
 * Format time to HH:MM(AM | PM) from hours and minutes 
 * @param {number} hours - example 12
 * @param {number} minutes  example 30
 * @returns {string} - The formatted time example 12:30 PM
 */
export const hoursMinsToString = (hours: number, minutes: number):string => {
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
export const timeDiff = (timeStart: string, timeEnd: string):string => {  
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
 * Convert a time string to hours and minutes
 * @param { string } time  - example 12:30
 * @returns { string } - example 12 hours 30 minutes
 */
export const stringToHoursMinutes = (time: string):string => {
    const timeArray = time.split(':');
    const hours = parseInt(timeArray[0]);
    const minutes = parseInt(timeArray[1]);
    return minutes === 0 ? `${hours} hours` : `${hours} hours ${minutes} mn`;
}
