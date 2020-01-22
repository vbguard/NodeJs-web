// console.log("process: ", process.env);
// console.log("process.argv :", process.argv);
// console.log("__dirname :", __dirname);
// console.log("__filename :", __filename);
// console.log(process.argv[4]);
// console.log("module :", module);
// console.log("exports :", exports);
// console.log("module.exports :", module.exports);

// console.log("fun1 :", (exports.fun1 = () => console.log("fun1")));

// console.log("fun4 :", (exports.fun4 = () => console.log("fun4")));
// console.log("fun5 :", (exports.fun5 = () => console.log("fun5")));

function fun2(value) {
  console.log(value);
}

module.exports = fun2;

// console.log("fun2 :", (module.exports = { fun2 }));

// console.log("fun3 :", (module.exports.fun3 = () => console.log("fun3")));

// console.log("all module exports :", module.exports);
// console.log("exports", exports);
// console.log("process.env :", process.env);

// Для добавлення глобальних перемін ENV в командному рядку перед викликом програми пишемо
//? PORT=5000 node index.js
