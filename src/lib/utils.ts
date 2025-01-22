import { FilterFn, Row } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function transformObject<T>(
  data: T,
  keys: (keyof T)[],
  labels: string[],
) {
  return keys
    .map((key, index) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        return { label: labels[index], value: data[key] };
      }
      return null;
    })
    .filter((item) => item !== null);
}

export const numberFilterFn = (
  row: Row<unknown>,
  columnId: string,
  filterValue: string | number | undefined,
) => {
  const value = row.getValue(columnId);

  // If the filter value is not a valid number, return false
  const parsedFilterValue = parseFloat(String(filterValue));
  if (isNaN(parsedFilterValue)) {
    return false;
  }

  // Convert the cell value to a number if necessary
  const cellValue =
    typeof value === "number" ? value : parseFloat(String(value));

  // If the cell value is not a valid number, return false
  if (isNaN(cellValue)) {
    return false;
  }

  // Return true if the cell value matches the filter value exactly
  return cellValue === parsedFilterValue;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const numberContainsFilterFn: FilterFn<any> = (
  row,
  columnId,
  filterValue: string,
) => {
  const rowValue = row.getValue(columnId);
  if (typeof rowValue !== "number") {
    return false;
  }
  return String(rowValue).includes(filterValue);
};

// export function deepFlattenObject(ob: { [key: string]: any }): { [key: string]: any } {
//   const toReturn: { [key: string]: any } = {};

//   for (const i in ob) {
//     if (!Object.prototype.hasOwnProperty.call(ob, i)) continue;

//     if (typeof ob[i] === 'object' && ob[i] !== null) {
//       const flatObject = flattenObject(ob[i]);
//       for (const x in flatObject) {
//         if (!Object.prototype.hasOwnProperty.call(flatObject, x)) continue;

//         toReturn[`${i}.${x}`] = flatObject[x];
//       }
//     } else {
//       toReturn[i] = ob[i];
//     }
//   }
//   return toReturn;
// }

export function flattenObject<D, R>(arr: D[]) {
  if (arr) {
    return arr.map((obj) => flattenSingleObject(obj) as R);
  }
}

function flattenSingleObject<D>(
  obj: D,
  parentKey = "",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: Record<string, any> = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        // Recursively flatten nested objects
        flattenSingleObject(obj[key], newKey, result);
      } else {
        // Assign the flattened key-value pair
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}
