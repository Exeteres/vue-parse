# Data processing

You can modify the fetched data using `result` property :

```js
{
    result: r => r.field
}
```

And then sort using `sort` property :

```js
{
    sort: (a, b) => a - b
}
```

You can read more about sorting in the documentation of the
[Array.sort()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
method.