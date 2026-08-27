import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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