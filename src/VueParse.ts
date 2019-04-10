import Vue from "vue";
import Parse from "parse";

export type Action = "find" | "first" | "count";

export interface VueParseItem {
    object: string | { new (): Parse.Object };
    query?: (this: Vue, q: Parse.Query) => Parse.Query;
    skip?: (this: Vue) => boolean;
    action?: Action;
    result?: (r: Parse.Object) => any;
    subscribe?: boolean | ((this: Vue) => boolean);
    sort?: (a: any, b: any) => number;
}

export default interface VueParse {
    [name: string]: VueParseItem | (() => VueParseItem);
}
