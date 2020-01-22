// модуль path
const path = require("path");
// console.log("path :", path);

// console.log("__filename :", __filename);
// console.log("__dirname :", __dirname);

// path.resolve()
// __fileName нам буде потрібен в крайніх випадках
// const exampleResolveFilename = path.resolve(__filename, "example.json");
// console.log("exampleResolveFilename :", exampleResolveFilename);

// Для взяття правильного шляху до потрібних нам файлів використовуємо __dirname
// const exampleResolveDirname = path.resolve(
//   __dirname,
//   "example/01/example.json"
// );
// console.log("exampleResolveDirname :", exampleResolveDirname);

// path.join();
exports.exampleJoin = path.join(__dirname, "example", "01", "example.json");
// const exampleJoin = path.join(__dirname, "example.json");
// console.log("exampleJoin :", exampleJoin);

// const example01Join = path.join(__dirname, "example", "01", "example.json");
// console.log("example01Join :", example01Join);

// Коли потрібно вийти на рівень вище
// const exampleUp = path.join(__dirname, "..", "exampleMain.json");
// console.log("exampleUp :", exampleUp);

// Шлях до папки
exports.folder = path.resolve(__dirname, "example", "01");
// const folder = path.resolve(__dirname, "01");
// console.log("folder :", folder);
