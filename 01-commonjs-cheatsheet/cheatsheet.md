# Default export

```js
const name = "Mango";

module.exports = name;

const name = require("...");
```

# Named export

```js
const name = "Mango";

module.exports = {
  name
};

const { name } = require("...");
```

# exports vs module.exports

[ссылка на слайд exports vs module.exports и откуда вообще они приходят](https://blog.tableflip.io/the-difference-between-module-exports-and-exports/)
