import { useEffect } from "react";

export function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    const body = document.body;
    const scrollbarWidth = window.innerWidth - body.clientWidth;

    if (isLocked) {
      body.classList.add("_locked");
      body.style.setProperty("--page-scrollbar-width", `${scrollbarWidth}px`);
    } else {
      body.classList.remove("_locked");
      body.style.setProperty("--page-scrollbar-width", `0px`);
    }

    return () => {
      body.classList.remove("_locked");
    };
  }, [isLocked]);
}
