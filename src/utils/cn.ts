import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const cn = (
  ...classes: Array<string | undefined | null | boolean>
): string => {
  return twMerge(clsx(classes));
};
