import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type PathParams = { [key: string]: string | number };

export function generatePath(path: string, params: PathParams = {}): string {
  return path.replace(/\[([^\]]+)\]/g, (_, key) => {
    if (params[key] !== undefined) {
      return String(params[key]);
    }
    throw new Error(`Missing parameter '${key}' for path '${path}'`);
  });
}
