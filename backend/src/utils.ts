/**
 * Adds a given no. of days to a Date
 * @param base Base date
 * @param days no. of days to Add
 * @returns Date when days are added to the base date
 */
export function addDays(base:Date, days:number):Date {
    var date = new Date(base.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}