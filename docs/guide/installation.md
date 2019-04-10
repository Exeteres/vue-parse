# Installation

Install VueParse via the package manager:

```shell
yarn add -D vue-parse
```

Connect it to your Vue project:

```js
import Vue from "vue";
import VueParse from "vue-parse";

Vue.use(VueParse, {
    appId: "...",
    key: "...",
    serverURL: "..."
});
```
