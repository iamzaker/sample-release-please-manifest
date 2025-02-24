import { addDays, compareDates, differenceInDays, formatDate, helloWorld, isToday, startOfMonth, startOfWeek, subtractDays } from "./date-helper";

describe('Date Helper Functions', () => {
    it('helloWorld should return the correct message', () => {
        const message = helloWorld();
        expect(message).toBe('Hello World from package version 0.0.21!');
        expect(message).toBe('Hello World from package version 0.0.21!');
    });

    it('formatDate should format date correctly', () => {
        const date = new Date('2023-10-05T14:48:00');
        const formattedDate = formatDate(date, 'YYYY-MM-DD HH:mm:ss');
        expect(formattedDate).toBe('2023-10-05 14:48:00');
    });

    it('compareDates should compare two dates correctly', () => {
        const date1 = new Date('2023-10-05');
        const date2 = new Date('2023-10-06');
        expect(compareDates(date1, date2)).toBe(-1);
    });

    it('addDays should add days to a date correctly', () => {
        const date = new Date('2023-10-05');
        const newDate = addDays(date, 5);
        expect(newDate.getDate()).toBe(10);
    });

    it('subtractDays should subtract days from a date correctly', () => {
        const date = new Date('2023-10-05');
        const newDate = subtractDays(date, 5);
        expect(newDate.getDate()).toBe(30);
    });

    it('differenceInDays should return the correct difference in days', () => {
        const date1 = new Date('2023-10-05').getTime();
        const date2 = new Date('2023-10-10').getTime();
        expect(differenceInDays(date1, date2)).toBe(5);
    });

    it('isToday should return true if the date is today', () => {
        const today = new Date();
        expect(isToday(today)).toBe(true);
    });

    it('startOfWeek should return the start of the week', () => {
        const date = new Date('2023-10-05');
        const startOfWeekDate = startOfWeek(date);
        expect(startOfWeekDate.getDate()).toBe(1);
    });

    it('startOfMonth should return the start of the month', () => {
        const date = new Date('2023-10-05');
        const startOfMonthDate = startOfMonth(date);
        expect(startOfMonthDate.getDate()).toBe(1);
    });
});