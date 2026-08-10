import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { toast } from "sonner";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function toastPromiseWrapper(
  fn,
  options = {
    loading: "Loading...",
    success: `Succesfull`,
    error: (err) => `Something went wrong ( ${err} )`,
    richColors: true,
  },
) {
  const toastPromise = new Promise((resolve, reject) => {
    Promise.resolve(fn(resolve, reject)).catch((err) => reject(err));
  });
  toast.promise(toastPromise, options);
}

export function axiosWrapper(fn) {
  return async (...params) => {
    return Promise.resolve(fn(...params))
      .then((res) => {
        return { ...res.data, data: res.data.data };
      })
      .catch((err) => {
        console.log(err);
        if (axios.isAxiosError(err)) {
          const { response } = err;
          return new ApiResponse(false, response.data.message);
        }
        return new ApiResponse(false, err.message);
      });
  };
}

export const getDefaultAvatarUrl = (name) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${name}`;
