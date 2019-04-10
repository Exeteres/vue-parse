# Установка

Установите VueParse через пакетный менеджер:

```shell
yarn add -D vue-parse
```

Подключите его в ваш Vue проект:

```js
import Vue from "vue";
import VueParse from "vue-parse";

Vue.use(VueParse, {
    appId: "...",
    key: "...",
    serverURL: "..."
});
```
