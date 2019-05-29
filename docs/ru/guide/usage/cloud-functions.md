# Облачный код

Вы также просто можете использовать облачные функции. При этом `params` - реактивен, и
после его изменения функция будет вызвана еще раз.

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
