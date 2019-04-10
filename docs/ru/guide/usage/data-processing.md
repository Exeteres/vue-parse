# Обработка данных

Вы можете модифицировать полученные данные с помощью свойства `result`:

```js
{
    result: r => r.field
}
```

А после отсортировать с помощью свойства `sort`:

```js
{
    sort: (a, b) => a - b
}
```

Подробнее про сортировку вы можете прочитать в документации метода
[Array.sort()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).