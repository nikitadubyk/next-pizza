"use client";

import { useState, useEffect } from "react";

/**
 * Debounces a value by a specified delay, returning the debounced value.
 * @param {string} value - The value to debounce.
 * @param {number} [delay=500] - The debounce delay in milliseconds.
 * @returns {string} The debounced value.
 */
export const useDebounce = (value: string, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
