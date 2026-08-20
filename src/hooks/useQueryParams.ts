import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const get = useCallback(
    (key: string) => {
      return search.get(key);
    },
    [search],
  );

  const set = useCallback(
    (data: Record<string, string | undefined>) => {
      const params = new URLSearchParams(search.toString());
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(nextUrl);
    },
    [pathname, router, search],
  );

  return { get, set, literal: search.toString() };
}
