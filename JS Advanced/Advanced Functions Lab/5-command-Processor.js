function solution() {
  let value = '';

  return {
    append(input) {
      value += input;
    },
    removeStart(index) {
      value = value.slice(index);
    },
    removeEnd(index) {
      value = value.slice(0, -index);
    },
    print() {
      console.log(value);
    },
  };
}

let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();
