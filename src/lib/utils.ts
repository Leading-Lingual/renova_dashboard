import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const passwordCriteria = [
  { regex: /[A-Z]/, description: "At Least one UPPERCASE character (A-Z)" },
  { regex: /[a-z]/, description: "At Least one lowercase character (a-z)" },
  { regex: /[0-9]/, description: "At Least one numeric character (0-9)" },
  {
    regex: /[!@#$%^&*(),.?":{}|<>]/,
    description: "At Least one special character (@,$,!,%,*,#,_,?,or-)",
  },
  { regex: /.{8,}/, description: "At Least 8 characters" },
];

export const validatePassword = (pass: string) => {
  return passwordCriteria.map((criterion) => ({
    ...criterion,
    isValid: criterion.regex.test(pass),
  }));
};

export function getCookieValue(cookie: string | undefined) {
  if (!cookie) return undefined;

  const [nameValue] = cookie.split(";");
  const separatorIndex = nameValue.indexOf("=");

  if (separatorIndex === -1) return undefined;

  return nameValue.slice(separatorIndex + 1);
}

export const getNameFromEmail = (email?: string) =>
  email ? email.split("@")[0] : "";

export const getFirstWord = (value: string): string => {
  return value.trim().split(" ")[0] || "";
};

export const getInitials = (value: string): string => {
  const words = value.trim().split(" ").filter(Boolean);

  const isLetter = (char: string) => /^[A-Za-z]$/.test(char);

  if (words.length === 0) return "?";

  const firstInitial = words[0].charAt(0);

  if (!isLetter(firstInitial)) return "?";

  if (words.length === 1) {
    return firstInitial.toUpperCase();
  }

  const secondInitial = words[1].charAt(0);

  if (!isLetter(secondInitial)) {
    return firstInitial.toUpperCase();
  }

  return `${firstInitial}${secondInitial}`.toUpperCase();
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = -1;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

export const formatText = (value: string) =>
  value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^./, (char) => char.toUpperCase());

export const formatNumber = (num: number) => {
  const toString = String(num);
  const formattedNumber = toString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedNumber;
};
