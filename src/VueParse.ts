import Vue from "vue";
import Parse from "parse";

export type Action = "find" | "first" | "count";

export interface VueParseShared {
    skip?: (this: Vue) => boolean;
    sort?: (a: any, b: any) => number;
}
export interface VueParseQuery extends VueParseShared {
    object: string | { new (): Parse.Object };
    query?: (this: Vue, q: Parse.Query) => Parse.Query;
    result?: (r: Parse.Object) => any;
    action?: Action;
    subscribe?: boolean | ((this: Vue) => boolean);
}

export interface VueParseFunction extends VueParseShared {
    function: string;
    result?: (r: any) => any;
    params?: ((this: Vue) => any) | any;
}

export function isQuery(item: VueParseItem) {
    return "object" in item;
}

export function isFunction(item: VueParseItem) {
    return "function" in item;
}

export type VueParseItem = VueParseQuery | VueParseFunction;

export default interface VueParse {
    [name: string]: VueParseItem;
}
