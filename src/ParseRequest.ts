import { Object, Query } from "parse";
import { VueParseItem } from "./VueParse";
import Vue from "vue";

interface ParseRequestOptions {
    definition: VueParseItem;
    vue: Vue;
    name: string;
}

type ObjectClass = new () => Object;

export default class ParseRequest {
    public promise: Promise<Object | Object[] | number>;
    public name: string;

    private definition: VueParseItem;
    private vue: Vue;
    private subscription: Parse.LiveQuerySubscription;
    private watchers: Function[] = [];

    private get object(): ObjectClass {
        return typeof this.definition.object === "string"
            ? (Parse.Object.extend(
                  this.definition.object
              ) as new () => Parse.Object)
            : this.definition.object;
    }

    private getQuery(): Query {
        const q = new Query(this.object);
        return this.definition.query
            ? this.definition.query.call(this.vue, q)
            : q;
    }

    private get query(): Query {
        return this.getQuery();
    }

    private get canQuery(): boolean {
        return this.definition.skip
            ? !this.definition.skip.call(this.vue)
            : true;
    }

    private get canSubscribe(): boolean {
        return typeof this.definition.subscribe === "function"
            ? this.definition.subscribe.call(this)
            : this.definition.subscribe;
    }

    public constructor(options: ParseRequestOptions) {
        this.definition = options.definition;
        this.name = options.name;
        this.vue = options.vue;
    }

    private updateData(data: Parse.Object[] | Parse.Object | number) {
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

    private rewriteData(data) {
        this.vue.$data[this.name] = data;
    }

    private pushData(data) {
        this.vue.$data[this.name].push(data);
    }

    private findDataIndex(func) {
        return this.vue.$data[this.name].findIndex(func);
    }

    public dispatch() {
        if (!this.canQuery) return;
        this.promise = this.definition.action
            ? this.query[this.definition.action]()
            : this.query.find();
        this.setupHandler();
    }

    public async setupWatchers() {
        this.watchers.push(
            this.vue.$watch(
                () => this.getQuery.call(this),
                n => {
                    this.dispatch();
                    this.resubscribe();
                }
            )
        );

        if (typeof this.definition.subscribe !== "function") return;
        this.watchers.push(
            this.vue.$watch(this.definition.subscribe, n => {
                if (n) this.setupSubscription();
                else this.destroySubscription();
            })
        );
    }

    public destroy() {
        this.destroySubscription();

        for (const unwatch of this.watchers) unwatch();
    }

    private destroySubscription() {
        if (!this.subscription) return;
        this.subscription.removeAllListeners();
        this.subscription = null;
    }

    private resubscribe() {
        this.destroySubscription();
        this.setupSubscription();
    }

    public async setupSubscription() {
        if (this.subscription) return;
        if (!this.canSubscribe) return;

        // Subscriptions
        this.subscription = await this.query.subscribe();

        switch (this.definition.action) {
            case "find": {
                this.subscription.on("create", object => {
                    const data = this.updateData(object);
                    this.pushData(data);
                });

                this.subscription.on("update", object => {
                    const data = this.updateData(object);
                    const item = this.findDataIndex(x => x.id === object.id);
                    if (item == -1) this.pushData(data);
                    else Vue.set(this.vue.$data[this.name], item, data);
                });

                this.subscription.on("delete", object => {
                    const item = this.findDataIndex(x => x.id === object.id);
                    if (item != -1) this.vue.$data[this.name].splice(item, 1);
                });
                break;
            }
            case "first": {
                this.subscription.on("create", object => {
                    this.rewriteData(this.updateData(object));
                });

                this.subscription.on("update", object => {
                    this.rewriteData(this.updateData(object));
                });

                this.subscription.on("delete", () => {
                    this.rewriteData(null);
                });
                break;
            }
        }
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
