# Модели данных

В обычном Parse SDK для получения и модификации данных объекта используются `get` и `set`:

```js
const Item = Parse.Object.extend("Item");
item.set("field", "value");
await item.save();
const value = item.get("field"); // "value"
```

Однако это можно обойти используя декораторы `@model` и `@prop`, предоставляемые VueParse.
Для начала определим модель. Она представляет собой ES6 класс, унаследованный от `Parse.Object`:

```ts
@model("Item")
class Item extends Parse.Object {
    @prop() field: string;
}
```

Теперь мы можем обращаться к `field` как к обычному свойству:

```ts
const item = new Item();
item.field = "value";
await item.save();
const value = item.field; // "value"
```