import { JSX } from "react";
import { ExtractParams } from "../hooks/useUrlParams";

export class Route<Path extends string> {

  constructor(public name: string, public path: Path, public element: JSX.Element) {
  }

  public createUrl(params: ExtractParams<Path>): string {
    return this.path.replace(/:[a-zA-Z]+/g, (match) => {
      const key = match.slice(1);
      return params[key] ?? match;
    });
  }
}