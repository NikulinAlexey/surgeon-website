"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type ToastTone = "success" | "error" | "info";
interface ToastItem { id: number; tone: ToastTone; title: string; message?: string }
interface ToastContextValue {
  showToast: (tone: ToastTone, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((tone: ToastTone, title: string, message?: string) => {
    const id = nextId.current++;
    setToasts((current) => [...current, { id, tone, title, message }]);
    timers.current.set(id, setTimeout(() => dismiss(id), 4500));
  }, [dismiss]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-viewport" aria-label="Системные уведомления">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.tone}`} role={toast.tone === "error" ? "alert" : "status"}>
            <span className="toast__indicator" aria-hidden="true" />
            <div className="toast__content">
              <strong className="toast__title">{toast.title}</strong>
              {toast.message && <p className="toast__message">{toast.message}</p>}
            </div>
            <button type="button" className="toast__close" onClick={() => dismiss(toast.id)} aria-label="Закрыть уведомление">×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
