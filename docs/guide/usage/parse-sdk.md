# Parse SDK

VueParse provides a wrapper for some commonly used methods from the Parse SDK.
You can call them inside any component:

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

However, you can also import missing methods from the original Parse SDK:

```js
import Parse from "parse";
async Parse.User.logOut()
```

Read more in the official manual of [Parse SDK](https://docs.parseplatform.org/js/guide/).
