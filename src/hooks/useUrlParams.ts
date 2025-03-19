import { useParams } from "react-router-dom";
import { Route } from "../types/Route";

type ExtractParams<URL extends string> =
    URL extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Rest extends "" ? { [k in Param]: string | undefined } : { [k in Param | keyof ExtractParams<Rest>]: string | undefined }
    : URL extends `${infer _Start}:${infer Param}`
    ? { [k in Param]: string | undefined }
    : {};

export default function useUrlParams<R extends string>(route: Route<R>): ExtractParams<R> {
    return useParams() as ExtractParams<R>;
}