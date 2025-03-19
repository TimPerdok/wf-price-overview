/**
 * Route type
 */
export type Route<P extends string = string> = {
  path: P;
  element: React.ReactElement;
  createUrl: (urlName: string) => string;
}