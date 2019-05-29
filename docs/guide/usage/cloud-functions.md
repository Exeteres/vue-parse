# Cloud functions

You can also simply use cloud functions. In this case, `params` - reactive, and
after its change, the function will be called again.

```js
parse: {
    averageStars: {
        function: "averageStars",
        params() {
            return {
                movie: this.movie
            };
        }
    }
}
```
