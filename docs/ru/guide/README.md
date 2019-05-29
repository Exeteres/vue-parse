# Вступление

VueParse предоставляет простой способ объявлять запросы к Parse Server.

# Пример использования

```vue
<template>
    <ul>
        <li v-for="todo in todos" :key="todo">{{ todo }}</li>
    </ul>
</template>
```

```js
export default {
    parse: {
        todos: {
            object: "Todo",
            subscribe: true,
            query: q => q.equalTo("status", "deferred"),
            result: r => r.get("title")
        }
    }
};
```
