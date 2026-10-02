
import { ACTIVITIES } from "@/types/user.type";

const { SELL, BUY, PROCESS_RECYCLE, COLLECT } = ACTIVITIES;

export const ACCESS = {
  listings: [SELL],
  marketplace: [BUY, PROCESS_RECYCLE],
  orders: [SELL, BUY, PROCESS_RECYCLE],
  pickups: [SELL, BUY, PROCESS_RECYCLE, COLLECT],
  wallet: [SELL, BUY, PROCESS_RECYCLE, COLLECT],
} as const;

export const hasAccess = (
  userActivities: readonly string[],
  allowed: readonly string[],
) => allowed.some((a) => userActivities.includes(a));

const ROUTE_RULES = [
  { prefix: "/listing", anyOf: ACCESS.listings },
  { prefix: "/marketplace", anyOf: ACCESS.marketplace },
  { prefix: "/orders", anyOf: ACCESS.orders },
  { prefix: "/pickup", anyOf: ACCESS.pickups },
  { prefix: "/wallet", anyOf: ACCESS.wallet },
];

export const canAccess = (pathname: string, userActivities: readonly string[]) => {
  const path = pathname.toLowerCase();
  const rule = ROUTE_RULES.find(
    (r) => path === r.prefix || path.startsWith(`${r.prefix}/`),
  );
  return rule ? hasAccess(userActivities, rule.anyOf) : true;
};