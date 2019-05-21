# Parse SDK

VueParse предоставляет враппер для часто используемых методов из Parse SDK.
Вы можете вызвать их внутри любого компонента:

```js
// User
async this.$parse.logIn(username, password, options?)
async this.$parse.logOut()

// Cloud
async this.$parse.run(name, data, options?)
async this.$parse.getJobsData()
async this.$parse.startJob(name, data)
async this.$parse.getJobStatus(id)

// Getters
this.$parse.user
```

Однако, вы также можете импортировать недостающие методы из Parse SDK:

```js
import Parse from "parse";
async Parse.User.logOut()
```

Подробнее читайте в официальном руководстве [Parse SDK](https://docs.parseplatform.org/js/guide/).
