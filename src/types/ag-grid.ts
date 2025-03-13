
export const EMPTY = "empty";
export const EQUALS = "equals";
export const NOT_EQUAL = "notEqual";
export const LESS_THAN = "lessThan";
export const LESS_THAN_OR_EQUAL = "lessThanOrEqual";
export const GREATER_THAN = "greaterThan";
export const GREATER_THAN_OR_EQUAL = "greaterThanOrEqual";
export const IN_RANGE = "inRange";
export const CONTAINS = "contains";
export const NOT_CONTAINS = "notContains";
export const STARTS_WITH = "startsWith";
export const ENDS_WITH = "endsWith";

export const POSSIBLE_FILTER_TYPES = [
    EMPTY,
    EQUALS,
    NOT_EQUAL,
    LESS_THAN,
    LESS_THAN_OR_EQUAL,
    GREATER_THAN,
    GREATER_THAN_OR_EQUAL,
    IN_RANGE,
    CONTAINS,
    NOT_CONTAINS,
    STARTS_WITH,
    ENDS_WITH
] as const;

export const POSSIBLE_TEXT_FILTER_TYPES = [
    EMPTY,
    EQUALS,
    NOT_EQUAL,
    CONTAINS,
    NOT_CONTAINS,
    STARTS_WITH,
    ENDS_WITH
] as const;

export const POSSIBLE_NUMBER_FILTER_TYPES = [
    EMPTY,
    EQUALS,
    NOT_EQUAL,
    LESS_THAN,
    LESS_THAN_OR_EQUAL,
    GREATER_THAN,
    GREATER_THAN_OR_EQUAL,
    IN_RANGE
] as const;

export const POSSIBLE_DATE_FILTER_TYPES = [EMPTY, EQUALS, NOT_EQUAL, LESS_THAN, GREATER_THAN, IN_RANGE] as const;