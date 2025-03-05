import { useContext } from "react";
import {
  ToastContext,
  ToastContextType,
} from "../components/toast/ToastProvider.tsx";

export function useToast() {
  return useContext<ToastContextType>(ToastContext);
}
