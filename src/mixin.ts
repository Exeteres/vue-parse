import DollarParse from "./DollarParse";
import Vue from "vue";
import { VueParseItem, isFunction, isQuery } from "./VueParse";
import { ParseFunction } from "./ParseFunction";
import { ParseQuery } from "./ParseQuery";

async function setupQueries(this: Vue) {
    const parse = this.$options.parse;
    if (!parse) {
        this.$parse = new DollarParse([]);
        return;
    }

    const reqs = [];

    for (var key in parse) {
        const definition = parse[key];

        if (isFunction(definition)) {
            const req = new ParseFunction({
                vue: this,
                name: key,
                definition
            });
            reqs.push(req);
            continue;
        }

        if (isQuery(definition)) {
            const req = new ParseQuery({
                vue: this,
                name: key,
                definition
            });
            reqs.push(req);
        }
    }

    this.$parse = new DollarParse(reqs);
}

async function launchQueries(this: Vue) {
    if (!this.$parse) return;

    this.$parse.launch();
}

export default {
    data(this: Vue) {
        if (!this.$parse) return {};
        const result = {};
        this.$parse.enumerate().forEach(x => {
            result[x] = [];
        });
        return result;
    },
    beforeCreate: setupQueries,
    created: launchQueries,
    destroyed(this: Vue) {
        if (!this.$parse) return;
        this.$parse.destroy();
    }
};
