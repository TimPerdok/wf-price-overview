import { useParams } from "react-router";
import { Route } from "../types/Route";

export type ExtractParams<URL extends string> =
    URL extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Rest extends "" ? { [k in Param]: string | undefined } : { [k in Param | keyof ExtractParams<Rest>]: string | undefined }
    : URL extends `${infer _Start}:${infer Param}`
    ? { [k in Param]: string | undefined }
    : {};

export default function useUrlParams<Path extends string>(route: Route<Path>): ExtractParams<Path> {
    return useParams() as ExtractParams<Path>;
}