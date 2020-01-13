# Default export

```js
// moduleA.js
const name = "Mango";

module.exports = name;

// moduleB.js
const name = require("./path/to/moduleA");
```

# Named export

```js
// moduleA.js
const name = "Mango";
const email = "mango@mail.com";

module.exports = {
  name,
  email
};

// moduleB.js
const { name, email } = require("./path/to/moduleA");
```

```js
NativeModule.wrapper = [
  "(function (exports, require, module, __filename, __dirname) { ",
  "\n});"
];
```

# exports vs module.exports

[ссылка на слайд exports vs module.exports и откуда вообще они приходят](https://blog.tableflip.io/the-difference-between-module-exports-and-exports/)
