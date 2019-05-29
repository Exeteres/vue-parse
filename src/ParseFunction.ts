import { ParseRequest } from "./ParseRequest";
import { VueParseFunction } from "./VueParse";
import { Cloud } from "parse";

export class ParseFunction extends ParseRequest {
    protected definition: VueParseFunction;

    private getParams(): any {
        return typeof this.definition.params === "function"
            ? this.definition.params.call(this.vue)
            : this.definition.params;
    }

    public dispatch() {
        this.promise = Cloud.run(this.definition.function, this.getParams());
        super.dispatch();
    }

    public setupWatchers(): void {
        super.setupWatchers();
        if (!this.definition.params) return;
        this.watchers.push(
            this.vue.$watch(
                () => this.getParams.call(this),
                n => {
                    this.dispatch();
                }
            )
        );
    }
}
