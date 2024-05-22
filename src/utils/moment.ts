import moment from "moment";




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

