import _words from "lodash.words";

const bisect = (str: string) => {
  return [str.slice(0, str.length / 2), str.slice(str.length / 2, str.length)];
};

type Turduckenable = string | string[];

/**
 * Converts an array of tokens, or a string consisting of an array of tokens,
 * into a turducken case string.
 *
 * A turducken case word is constructed by joining an array of tokens by the following logic:
 *   - If the token precedes the halfway point of the array (rounding down to the nearest integer),
 *     remove all characters from the second half of the token.
 *   - If the token comes after the halfway point of the array (rounding down to the nearest integer),
 *     remove all characters from the first half of the token.
 *   - Join the remaining halves into a single string.
 */
export function turducken(t: Turduckenable) {
  let words: string[];
  if (typeof t === "string") {
    words = _words(t).map((s) => s.toLowerCase());
  } else {
    words = t.map((s) => s.toLowerCase());
  }

  if (!words.length) {
    return "";
  }

  // ["turkey", "duck", "chicken"] => "turducken"
  // for all words which precede the halfway point of the array (inclusive), use the first half
  // for all words which come after the halfway point of the array, use the second half
  const halves = words.map(bisect);
  return halves
    .map(([l, r], i, arr) => {
      if (i < arr.length / 2) {
        return l;
      }
      return r;
    })
    .join("");
}

/**
 * Converts an array of tokens, or a string consisting of an array of tokens,
 * into an inverse turducken case string.
 *
 * This function inverts the logic in {@link turducken}.
 */
export function keyckchi(t: Turduckenable) {
  let words: string[];
  if (typeof t === "string") {
    words = _words(t).map((s) => s.toLowerCase());
  } else {
    words = t.map((s) => s.toLowerCase());
  }

  if (!words.length) {
    return "";
  }

  // ["turkey", "duck", "chicken"] => "turducken"
  // for all words which precede the halfway point of the array (inclusive), use the first half
  // for all words which come after the halfway point of the array, use the second half
  const halves = words.map(bisect);
  return halves
    .map(([l, r], i, arr) => {
      if (i > arr.length / 2) {
        return l;
      }
      return r;
    })
    .join("");
}
