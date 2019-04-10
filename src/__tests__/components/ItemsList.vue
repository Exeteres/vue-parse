<template></template>

<script lang="ts">
import Vue from "vue";
import { extend } from "../..";
import Item from "../models/Item";

export default Vue.extend({
    data() {
        return { regex: /1|3/ };
    },
    parse: {
        item: extend({
            object: Item,
            query(q) {
                return q.matches("p", this.regex, null);
            },
            result: r => r.p,
            action: "first",
            subscribe: true
        }),
        items: extend({
            object: Item,
            action: "find",
            subscribe: true
        })
    }
});
</script>
