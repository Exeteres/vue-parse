# Parse SDK

Обратите внимание, что VueParse может только запрашивать информацию, т.к. это его основная задача.
Вам следует использовать обычный Parse SDK для остальных запросов.

Для авторизации и управлением пользователем в Parse SDK есть следующие методы:

```js
async Parse.User.logIn(username, password, options)
async Parse.User.logOut()
Parse.User.current()
```

Для модификации данных:

```js
const Item = Parse.Object.extend("Item");

const item = new Item();
todo.set("field", "value");
await item.save();
```

Подробнее читайте в официальном руководстве [Parse SDK](https://docs.parseplatform.org/js/guide/).