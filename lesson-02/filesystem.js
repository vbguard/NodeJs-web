const fs = require("fs");
const paths = require("./path");

// console.log("paths :", paths);
// fs.readFileSync();
// fs.readFile("example.json", (err, data) => {
//   if (err) console.log("err :", err);
//   console.log("data :", data);
// });

// fs.readFile(paths.exampleJoin, (err, data) => {
//   console.log("data :", data);
// });

// fs.readFile(paths.exampleJoin, { encoding: "utf-8" }, (err, data) => {
//   console.log("data:", data);
//   console.log("data type :", typeof data);
//   const normalize = JSON.parse(data);

//   console.log("normalized data parse JSON:", normalize);
//   console.log("normalized data :", typeof normalize);
//   console.log("data[0] :", normalize[0]);
// });

// // // fs.writeFileSync();
// fs.writeFile("newfile.json", JSON.stringify({ name: "first" }), err => {
//   if (err) console.log("err :", err);
//   console.log("save");
// });

// fs.appendFile("newfile.txt", ". Hello content!", function(err) {
//   if (err) throw err;
//   console.log("Saved!");
// });

// fs.appendFile("newfile.txt", " It's amazing!", function(err) {
//   if (err) throw err;
//   console.log("Saved!");
// });

// fs.unlink("newfile-fd.txt");

// fs.unlinkSync("newfile.txt");

// try {
//   const readFile = fs.readFileSync("newfile-fa.txt", { encoding: "utf-8" });

//   console.log("readFile :", readFile);
// } catch (error) {
//   console.log("error :", error);
// }
