# Introduction

This library provides simple way to declare your parse requests.

# Usage example

```html
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
