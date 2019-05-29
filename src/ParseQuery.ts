import { ParseRequest, ObjectClass } from "./ParseRequest";
import { Query } from "parse";
import { VueParseQuery } from "./VueParse";
import Vue from "vue";

export class ParseQuery extends ParseRequest {
    protected definition: VueParseQuery;

    private subscription: Parse.LiveQuerySubscription;

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

    public dispatch() {
        if (!this.canQuery) return;
        this.promise = this.definition.action
            ? this.query[this.definition.action]()
            : this.query.find();
        super.dispatch();
    }

    public async setupWatchers() {
        super.setupWatchers();
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

    public launch() {
        super.launch();
        this.setupSubscription();
    }

    public destroy() {
        this.destroySubscription();
        super.destroy();
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
            default: {
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
        }
    }
}
