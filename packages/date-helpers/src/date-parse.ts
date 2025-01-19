export function parseDate(dateString: any, format = 'YYYY-MM-DD') {
    const regex = format
        .replace('YYYY', '(\\d{4})')
        .replace('MM', '(\\d{2})')
        .replace('DD', '(\\d{2})')
        .replace('HH', '(\\d{2})')
        .replace('mm', '(\\d{2})')
        .replace('ss', '(\\d{2})');
    const match = new RegExp(regex).exec(dateString);

    if (!match) return null;

    const [_, year, month, day, hours = 0, minutes = 0, seconds = 0] = match.map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
}