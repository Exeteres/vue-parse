import { shallowMount } from "@vue/test-utils";
import ItemsList from "./components/ItemsList.vue";
import Vue from "vue";
import VueParse, { VueParseOptions } from "..";
import Parse from "parse";
import Item from "./models/Item";

Vue.use<VueParseOptions>(VueParse, {
    appId: "0rehSPD4qLQpaMruEdEwzqOyePFD9gzf79JlRX8H",
    key: "kARaPYFuVA3v8CF3AZXNdioPM16oiB0nsfhXhBMx",
    serverURL: "https://vue-parse-example.back4app.io"
});

async function cleanUP() {
    const items = await new Parse.Query(Item).find();
    for (var i = 0; i < items.length; i++) {
        await items[i].destroy();
    }
}

beforeAll(cleanUP);
afterAll(async () => {
    await cleanUP();
    Parse["LiveQuery"].close();
});

async function createItem(p: string) {
    const instance = new Item();
    instance.p = p;
    await instance.save();
    return instance;
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

jest.setTimeout(15000);

test("test :)", async () => {
    const first = await createItem("1");

    // Wrapping vue component
    const wrapper = shallowMount(ItemsList);

    // -- Test query
    expect(wrapper.vm.$data.items).toEqual([]);
    await wrapper.vm.$parse.wait();
    expect(wrapper.vm.$data.items).toHaveLength(1);
    expect(wrapper.vm.$data.items[0].p).toEqual("1");
    expect(wrapper.vm.$data.item).toEqual("1");

    // -- Test cloud code
    expect(wrapper.vm.$data.numbers).toEqual([1, 4, 9, 16, 25]);
    expect(wrapper.vm.$data.echo).toEqual("first");

    // -- Test subscriptions
    // Create
    const second = await createItem("2");
    await delay(10);
    expect(wrapper.vm.$data.items).toHaveLength(2);
    expect(wrapper.vm.$data.items[1].p).toEqual("2");

    // Update
    first.p = "3";
    second.p = "4";
    await first.save();
    await second.save();
    await delay(10);
    expect(wrapper.vm.$data.item).toEqual("3");
    expect(wrapper.vm.$data.items[1].p).toEqual("4");

    // Reactivity
    wrapper.vm.$data.regex = /4/;
    wrapper.vm.$data.word = "second";
    await wrapper.vm.$parse.wait();
    expect(wrapper.vm.$data.item).toEqual("4");
    expect(wrapper.vm.$data.echo).toEqual("second");

    // Delete
    await first.destroy();
    await second.destroy();
    await delay(10);
    expect(wrapper.vm.$data.items).toHaveLength(0);
    expect(wrapper.vm.$data.item).toBeNull();
});
