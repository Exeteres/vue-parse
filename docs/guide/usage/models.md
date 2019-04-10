# Models

The Parse SDK uses `get` and `set` to obtain and modify object data:

```js
const Item = Parse.Object.extend("Item");
item.set("field", "value");
await item.save();
const value = item.get("field"); // "value"
```

However, this can be bypassed using the `@model` and `@prop` decorators provided by VueParse.
First, let's define the model. It is an ES6 class inherited from `Parse.Object`:

```ts
@model("Item")
class Item extends Parse.Object {
    @prop() field: string;
}
```

Now we can use `field` as a normal property:

```ts
const item = new Item();
item.field = "value";
await item.save();
const value = item.field; // "value"
```