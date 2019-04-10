# Parse SDK

Please note that VueParse can only query information, since this is his main task.
You should use the regular Parse SDK for other requests.

For authorization and user management, Parse SDK provides the following methods:

```js
async Parse.User.logIn(username, password, options)
async Parse.User.logOut()
Parse.User.current()
```

To modify the data:

```js
const Item = Parse.Object.extend("Item");

const item = new Item();
todo.set("field", "value");
await item.save();
```

Read more in the official manual of [Parse SDK](https://docs.parseplatform.org/js/guide/).