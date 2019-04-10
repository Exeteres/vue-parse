# Queries

## Query definition

All queries are bound to a specific component and are executed after its creation.
You can define them in the `parse` option inside the component:

```js
export default {
    parse: {
        items: { ... }
    }
}
```

The simplest query should contain at least the name of the class whose objects will be queried:

```js
{ object: "Todo" }
```

This request will receive all objects of the class `Todo`.
To filter data, you can get and modify `Parse.Query`:

```js
{
    object: "Todo",
    query: q => q.equalTo("status", "deferred")
}
```

This query will receive all objects of the class `Todo` with the property `status` equal to `deferred`.

You can also specify the type of request:

```js
{
    action: "first"
}
```

And then as a result, you get one object.
Three types are supported: `find` (default), `first` and `count`.

## Data rendering

You can use the data as well as any of the other `data`:

```vue
<ul>
    <li v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
</ul>
```

## LiveQuery

When data is already received, it can be automatically updated via LiveQuery.
Just add `subscribe: true`

```js
{
    object: "Todo",
    subscribe: true
}
```

VueParse will do the rest for you.