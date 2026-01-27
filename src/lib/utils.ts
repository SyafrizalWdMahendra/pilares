import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const rupiahFormat = (value: number | string | undefined) => {
  const amount = Number(value);

  if (isNaN(amount)) return "Rp 0";

  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

export const generateRandomString = (length: number) => {
  let result = "";

  const characters =
    "ABCDWFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export function dateFormat(date: Date | null, format = "DD MMMM YYYY") {
  if (!date) {
    return dayjs().format(format);
  }

  return dayjs(date).format(format);
}
