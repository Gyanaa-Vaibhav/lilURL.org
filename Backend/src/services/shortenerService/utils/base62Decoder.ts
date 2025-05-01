/**
 * Decodes a base62 string back into its original numeric ID.
 *
 * Used to reverse a short code into the original database ID.
 *
 * @param {string} string - The base62-encoded input.
 * @returns {number} The decoded numeric value.
 *
 * @example
 * base62Decoder("21"); // returns 125
 */
export function base62Decoder(string:string):number {
    const base62Chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = 0

    for (let i = 0; i < string.length; i++) {
        result = result * 62 + base62Chars.indexOf(string[i]);
    }

    return result
}