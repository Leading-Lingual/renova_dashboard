
export const isNavbarVisible = (pathname: string): boolean => {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return true;

  if (segments.length === 1) return true;

  return false;
};