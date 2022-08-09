function solve(input) {
  let cars = carCreator();

  for (const line of input) {
    if (line.match(/(?<=\s|^)print(?=\s|$)/)) {
      let carName = line.split(' ').pop();
      cars.print(carName);
    } else if (line.match(/(?<=\s|^)set(?=\s|$)/)) {
      let [, name, key, value] = line.split(' ');
      cars.set(name, key, value);
    } else if (line.match(/(?<=\s|^)inherit(?=\s|$)/)) {
      let [, name, , parentName] = line.split(' ');
      cars.createInherit(name, parentName);
    } else {
      let name = line.split(' ').pop();
      cars.create(name);
    }
  }

  function carCreator() {
    let carList = {};
    return {
      create(name) {
        carList[name] = {};
      },
      createInherit(name, parentName) {
        carList[name] = Object.create(carList[parentName]);
      },
      set(name, key, value) {
        carList[name][key] = value;
      },
      print(name) {
        let objPrint = [];
        for (const key in carList[name]) {
          objPrint.push(`${key}:${carList[name][key]}`);
        }
        console.log(objPrint.join(','));
      },
    };
  }
}

// function solve(input) {
//   const data = {};

//   const instr = {
//     create: (n, inherits, n2) =>
//       (data[n] = inherits ? Object.create(data[n2]) : {}),
//     set: (n, k, v) => (data[n][k] = v),
//     print: (n) => {
//       const entry = [];
//       for (const key in data[n]) {
//         entry.push(`${key}:${data[n][key]}`);
//       }
//       console.log(entry.join(', '));
//     },
//   };

//   input.forEach((x) => {
//     const [c, n, k, v] = x.split(' ');

//     instr[c](n, k, v);
//   });
// }

solve([
  'create c1',
  'set c1 color red',
  'create c2 inherit c1',
  'set c2 model new',
  'print c1',
  'print c2',
]);
