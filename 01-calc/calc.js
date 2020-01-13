function sum(a, b) {
  console.log(a + b);
}

function sub(a, b) {
  console.log(a - b);
}

function mul(a, b) {
  console.log(a * b);
}

function div(a, b) {
  console.log(a / b);
}

function calc(type, ...args) {
  switch (type) {
    case "sum":
      sum(...args);
      break;

    case "sub":
      sub(...args);
      break;

    case "mul":
      mul(...args);
      break;

    case "div":
      div(...args);
      break;

    default:
      console.log("Unsupported operation type!");
  }
}

module.exports = calc;
