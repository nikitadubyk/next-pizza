import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes and removes any conflicting styles.
 * @param {...ClassValue[]} inputs - A list of class names to be merged.
 * @returns {string} The merged and resolved class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type PathParams = { [key: string]: string | number };

/**
 * Replaces placeholders in a path string with actual parameter values.
 * @param {string} path - The path string with placeholders (e.g. "/user/[id]").
 * @param {PathParams} [params={}] - An object containing key-value pairs to replace placeholders in the path.
 * @returns {string} The path string with the placeholders replaced by the actual parameter values.
 * @throws {Error} If a placeholder in the path does not have a corresponding value in the `params` object.
 */
export function generatePath(path: string, params: PathParams = {}): string {
  return path.replace(/\[([^\]]+)\]/g, (_, key) => {
    if (params[key] !== undefined) {
      return String(params[key]);
    }
    throw new Error(`Missing parameter '${key}' for path '${path}'`);
  });
}
