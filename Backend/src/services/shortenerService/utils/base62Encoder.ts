/**
 * Encodes a numeric ID into a base62 string.
 *
 * Useful for generating short, URL-friendly identifiers.
 *
 * @param {number} number - The numeric value to encode.
 * @returns {string} The base62-encoded string.
 *
 * @throws {Error} If the input is not a valid number.
 *
 * @example
 * base62Encoder(125); // returns "21"
 */
export function base62Encoder(number:number):string{
    if(isNaN(number)) throw new Error("Input should be a number")
    const base62Chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let string = '';
    if (number === 0) return '0';

    while (number > 0){
        string = base62Chars[number%62] + string;
        number = Math.floor(number/62)
    }

    return string
}