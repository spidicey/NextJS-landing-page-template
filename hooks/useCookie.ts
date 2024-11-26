import { useState } from "react";
import Cookies from "js-cookie";

/**
 * useCookie - React Hook for Cookies based on js-cookie
 * @param {string} key Cookie
 * @param {Object|string} [initialValue]  Value will be assign if cookie doesn't exist.
 * @returns {Array} Returns cookie value, and the function to update it.
 */
export function useCookie(key: string, initialValue: Object | string) {
  const [item, setInnerValue] = useState(() => {
    return Cookies.get(key) || initialValue;
  });

  /**
   * Set value of cookie
   * @param {Object|string} value
   * @param {Cookies.CookieAttributes} [options]
   */
  const setValue = (value: string, options: Cookies.CookieAttributes) => {
    setInnerValue(value);
    Cookies.set(key, value, options);
  };

  return [item, setValue];
}

export default useCookie;
