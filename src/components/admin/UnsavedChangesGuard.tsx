"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "./ConfirmDialog";

export function UnsavedChangesGuard({ isDirty }: { isDirty: boolean }) {
  const router = useRouter();
  const [pendingPath, setPendingPath] = useState("");

  useEffect(() => {
    if (!isDirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (!isDirty) return;
    const guardLinks = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      event.stopPropagation();
      setPendingPath(`${url.pathname}${url.search}${url.hash}`);
    };
    document.addEventListener("click", guardLinks, true);
    return () => document.removeEventListener("click", guardLinks, true);
  }, [isDirty]);

  return (
    <ConfirmDialog
      isOpen={Boolean(pendingPath)}
      title="Несохранённые изменения"
      description="Если покинуть страницу сейчас, изменения будут потеряны."
      confirmLabel="Покинуть страницу"
      danger
      onClose={() => setPendingPath("")}
      onConfirm={() => {
        const path = pendingPath;
        setPendingPath("");
        if (path) router.push(path);
      }}
    />
  );
}
