import * as React from "react";
import { useState } from "react";
import { Snackbar } from "@mui/material";

export interface ToastContextType {
  toast: (message: string) => void,
}

export const ToastContext = React.createContext<ToastContextType>({
  toast: (message: string) => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);

  const context: ToastContextType = { toast: setToast };
  return (
    <ToastContext.Provider value={context}>
      <Snackbar
        open={!!toast}
        autoHideDuration={5000}
        onClose={() => setToast(null)}
        message={toast}
      />
      {children}
    </ToastContext.Provider>
  );
}
