import { Object, Query } from "parse";
import { VueParseItem } from "./VueParse";
import Vue from "vue";

interface ParseRequestOptions {
    definition: VueParseItem;
    vue: Vue;
    name: string;
}

export type ObjectClass = new () => Object;

export abstract class ParseRequest {
    public promise: Promise<Object | Object[] | number>;
    public name: string;

    protected definition: VueParseItem;
    protected vue: Vue;
    protected watchers: Function[] = [];

    public constructor(options: ParseRequestOptions) {
        this.definition = options.definition;
        this.name = options.name;
        this.vue = options.vue;
    }

    protected updateData(data: Parse.Object[] | Parse.Object | number) {
        if (!Number.isNaN(Number(data))) return data;
        if (Array.isArray(data)) {
            let result = data;
            if (this.definition.result)
                result = data.map(x => this.definition.result.call(this, x));
            if (this.definition.sort)
                result = data.sort((a, b) =>
                    this.definition.sort.call(this, a, b)
                );
            return result;
        }
        return this.definition.result
            ? this.definition.result(data as Object)
            : data;
    }

    public destroy() {
        for (const unwatch of this.watchers) unwatch();
    }

    protected dispatch() {
        this.setupHandler();
    }

    public launch() {
        this.dispatch();
        this.setupWatchers();
    }

    public setupWatchers() {}

    protected rewriteData(data) {
        this.vue.$data[this.name] = data;
    }

    protected pushData(data) {
        this.vue.$data[this.name].push(data);
    }

    protected findDataIndex(func) {
        return this.vue.$data[this.name].findIndex(func);
    }

    public setupHandler() {
        this.promise
            .then(result => {
                this.vue.$data[this.name] = this.updateData(result);
            })
            .catch(err => {
                const handler = global["vue-parse-onerror"];
                if (handler) handler(err);
            });
    }
}
