"use client";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

const getWidth = () => window.innerWidth;
const getHeight = () => window.innerHeight;

const getServerSize = () => 0;

export const useWindowSize = () => {
  const width = useSyncExternalStore(subscribe, getWidth, getServerSize);
  const height = useSyncExternalStore(subscribe, getHeight, getServerSize);

  const isMobile = width < 768;
  const isLaptop = width <= 1024;
  const isSmallLaptop = width <= 1440;

  return { width, height, isMobile, isLaptop, isSmallLaptop };
};