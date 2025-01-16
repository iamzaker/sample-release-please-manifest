export class StringUtils {
  static capitalize(str: string) {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static reverse(str: string) {
    if (typeof str !== 'string') return '';
    return str.split('').reverse().join('');
  }

  static isPalindrome(str: string) {
    if (typeof str !== 'string') return false;
    const reversed = str.split('').reverse().join('');
    return str === reversed;
  }
}

export const capitalize = (str: string): string => {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}