"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  if (process.env.NODE_ENV === "development") (window as unknown as { __gsap: typeof gsap }).__gsap = gsap;
}

export const LOADED_EVENT = "fretadao:loaded";

/** Resolve quando o preloader terminou (ou imediatamente, se já terminou). */
export function onSiteLoaded(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if (document.documentElement.dataset.loaded === "true") {
    cb();
    return () => {};
  }
  window.addEventListener(LOADED_EVENT, cb, { once: true });
  return () => window.removeEventListener(LOADED_EVENT, cb);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText };
