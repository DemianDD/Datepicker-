import { isSunday } from 'date-fns';

export var defaultStartDate = new Date(isSunday(new Date()) ? new Date().setDate(new Date().getDate() + 1) : new Date());
export var defaultEndDate = new Date(defaultStartDate);
defaultEndDate.setFullYear(defaultEndDate.getFullYear() + 2);
defaultEndDate = isSunday(defaultEndDate) ? defaultEndDate.setDate(defaultEndDate.getDate() + 1) : defaultEndDate;

export const validation = {
    isTwoYearsApart: (date1, date2) => {
        const twoYearsInMillis = 2 * 365 * 24 * 60 * 60 * 1000;
        return date2 - date1 >= twoYearsInMillis;
    },
    isFutureSunday: (date) => {
        return !isSunday(date) && date > new Date();
    },
};