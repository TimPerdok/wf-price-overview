/**
 * Route type
 */
export type Route<P extends string = string> = {
  navigateTo(): void;
  path: P;
  element: React.ReactElement;
  createUrl: (urlName: string) => string;
}