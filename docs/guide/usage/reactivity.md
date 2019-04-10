# Reactivity

Some of the properties of the Vue Parse query are reactive, that is, they may depend on the state of the component.

```js
{
    query(q) {
        return q.equalTo("status", this.status)
    }
}
```

Now, if `this.status` is changed, the query will be re-executed, its data will be updated,
and LiveQuery has been recreated according to the new query.

:::warning
Due to the nature of JavaScript, you cannot use `this` inside lambdas.
This, by the way, was also stated in the Vue documentation.
:::

The property `subscribe` has reactivity, which allows you to disable synchronization in any
moment.

```js
{
    subscribe() {
        return this.autosync;
    }
}
```

The properties `result` and `sort` are also reactive.