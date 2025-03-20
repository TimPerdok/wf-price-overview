import "styled-components";
import theme from "../main.tsx";

type ThemeType = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType { }
}