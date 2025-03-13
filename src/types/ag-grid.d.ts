import type { IDatasource, IGetRowsParams } from "ag-grid-community";
import { POSSIBLE_DATE_FILTER_TYPES, POSSIBLE_FILTER_TYPES, POSSIBLE_NUMBER_FILTER_TYPES, POSSIBLE_TEXT_FILTER_TYPES } from "./ag-grid";

declare module "ag-grid-community" {

    export interface FilterModel {
        [colId: string]:
        | TextFilterModel
        | NumberFilterModel
        | DateFilterModel
        | ICombinedSimpleModel<TextFilterModel>
        | ICombinedSimpleModel<NumberFilterModel>
        | ICombinedSimpleModel<DateFilterModel>;
    }
}

export interface ProvidedFilterModel {
    filterType: "text" | "date" | "number";
}

export interface ISimpleFilterModel extends ProvidedFilterModel {
    type: typeof POSSIBLE_FILTER_TYPES[number];
}

export interface ICombinedSimpleModel<M extends ISimpleFilterModel> extends ProvidedFilterModel {
    operator: "AND" | "OR";
    condition1: M;
    condition2: M;
}

export interface TextFilterModel extends ISimpleFilterModel {
    filterType: "text";
    type: typeof POSSIBLE_TEXT_FILTER_TYPES[number];

    /**
     *  The text value associated with the filter.
     *  It's optional as custom filters may not have a text value
     */
    filter?: string;
}

export interface NumberFilterModel extends ISimpleFilterModel {
    filterType: "number";
    type: typeof POSSIBLE_NUMBER_FILTER_TYPES[number];

    /**
     * The number value(s) associated with the filter.
     * - custom filters can have no values (hence both are optional).
     * - range filter has two values (from and to).
     */
    filter?: number;

    /**
     * @see filter
     */
    filterTo?: number;
}

export interface DateFilterModel extends ISimpleFilterModel {
    filterType: "date";
    type: typeof POSSIBLE_DATE_FILTER_TYPES[number];

    /**
     * The date value(s) associated with the filter.
     * The type is string and format is always YYYY-MM-DD e.g. 2019-05-24
     * - custom filters can have no values (hence both are optional).
     * - range filter has two values (from and to).
     */
    dateFrom?: string;
    dateTo?: string;
}

export type FilterModel =
    | TextFilterModel
    | NumberFilterModel
    | DateFilterModel
    | ICombinedSimpleModel<TextFilterModel>
    | ICombinedSimpleModel<NumberFilterModel>
    | ICombinedSimpleModel<DateFilterModel>;