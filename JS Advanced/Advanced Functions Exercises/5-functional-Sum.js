function add(number) {
  let sum = number;

  function sumator(params) {
    sum += params;
    return sumator;
  }

  sumator.toString = () => {
    return sum;
  };

  return sumator;
}

console.log(add(1)(6)(-3).toString());
