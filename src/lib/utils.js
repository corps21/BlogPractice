import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function asyncHandler(fn) {
  return async function(...params) {
    return Promise.resolve(fn(...params)).then(result => ({
      success:true,
      data:result
    })).catch(err => {
      console.log(err)
      return {
        success:false,
        data:undefined
      }
    })
  }
}