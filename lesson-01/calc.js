const calc = require("../01-calc/calc");

const argv = process.argv;

// TODO (type, { a, b })

const type = argv[2];
const values = {
  a: Number(argv[3]),
  b: Number(argv[4])
};

calc(type, values);
