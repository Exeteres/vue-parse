import DollarParse from "./DollarParse";
import Vue from "vue";
import { VueParseItem } from "./VueParse";
import ParseRequest from "./ParseRequest";

async function setupQueries(this: Vue) {
    const parse = this.$options.parse;
    if (!parse) {
        this.$parse = new DollarParse([]);
        return;
    }

    const reqs = [];

    for (var key in parse) {
        const item = parse[key];
        const req = new ParseRequest({
            vue: this,
            name: key,
            definition:
                typeof item === "function"
                    ? (item.call(this) as VueParseItem)
                    : item
        });
        reqs.push(req);
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
