function sum(args) {
  console.log("args :", args);
  console.log(args.a + args.b);
}

function sub(args) {
  console.log(args.a - args.b);
}

function mul(args) {
  console.log(args.a * args.b);
}

function div(args) {
  console.log(args.a / args.b);
}

function calc(type, args) {
  switch (type) {
    case "sum":
      sum(args);
      break;

    case "sub":
      sub(args);
      break;

    case "mul":
      mul(args);
      break;

    case "div":
      div(args);
      break;

    default:
      console.log("Unsupported operation type!");
  }
}

module.exports = calc;
