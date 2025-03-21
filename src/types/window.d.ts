import { WindowVarKey } from "../hooks/useWindowVar";

declare global {
  interface Window {
    wfStorage: {
        [key in WindowVarKey]?: any;
    }
  }
}