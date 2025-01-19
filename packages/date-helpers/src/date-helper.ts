export const helloWorld = (): string => {
  const message = 'Hello World from package version 0.0.21!';
  console.log(message);
  return message;
};

export const formatDate = (date: Date, format: string): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);

  console.log(formattedDate);
  return formattedDate;
};

// Compares two dates (ignores time)
export function compareDates(date1: Date, date2: Date) {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getDate();
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()).getDate();
  return d1 - d2;
}

// Adds days to a date
export function addDays(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

// Subtracts days from a date
export function subtractDays(date: Date, days: number) {
  return addDays(date, -days);
}

// Gets the difference in days between two dates
export function differenceInDays(date1: number, date2: number) {
  const diffTime = date2 - date1;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}