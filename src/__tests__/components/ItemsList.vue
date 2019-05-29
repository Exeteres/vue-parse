<template></template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Item from "../models/Item";
import { extend } from "../..";

@Component({
    parse: {
        item: extend<ItemsList, Item>({
            object: Item,
            query(q) {
                return q.matches("p", this.regex, null);
            },
            result: r => r.p,
            action: "first",
            subscribe: true
        }),
        items: {
            object: Item,
            action: "find",
            subscribe: true
        },
        numbers: {
            function: "getTestData",
            result: r => r * r
        },
        echo: extend<ItemsList>({
            function: "echo",
            params() {
                return { data: this.word };
            }
        })
    }
})
export default class ItemsList extends Vue {
    regex = /1|3/;
    word = "first";
}
</script>
