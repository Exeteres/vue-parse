import Vue, { PluginFunction } from "vue";
import VueParse, { VueParseItem, Action } from "./VueParse";
import DollarParse from "./DollarParse";

import Parse, { Query } from "parse";

import mixin from "./mixin";

export interface VueParseOptions {
    appId: string;
    serverURL?: string;
    liveQueryServerURL?: string;
    key: string;
    parse?: string;
    onerror?: (e: Error) => void;
}

const install: PluginFunction<VueParseOptions> = (Vue, options) => {
    if (!options) throw new TypeError("You must provide parse options");
    if (!options.parse) options.parse = "parse";
    if (!options.serverURL) options.serverURL = "https://parseapi.back4app.com";

    Parse.initialize(options.appId, options.key);

    Parse.serverURL = options.serverURL;
    Parse.liveQueryServerURL = options.liveQueryServerURL;

    global["vue-parse-onerror"] = options.onerror;

    Vue.mixin(mixin);
};

interface VueParseItemTyped<T extends Parse.Object> {
    object: new (...args: any[]) => T;
    query?: (q: Parse.Query<T>) => Parse.Query<T>;
    action?: Action;
    result?: (r: T) => any;
    subscribe?: boolean | ((this: Vue) => boolean);
}

export function extend<T extends Parse.Object>(
    definition: () => VueParseItemTyped<T>
): () => VueParseItem;

export function extend<T extends Parse.Object>(
    definition: VueParseItemTyped<T>
): VueParseItem;

export function extend<T extends Parse.Object>(
    definition: VueParseItemTyped<T> | (() => VueParseItemTyped<T>)
): VueParseItem | (() => VueParseItem) {
    return definition;
}

export default install;

export * from "./decorators";
export * from "./vue";
