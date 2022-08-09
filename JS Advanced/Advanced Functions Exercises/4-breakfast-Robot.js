function solution() {
  let products = {
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    flavour: 0,
  };

  let meals = {
    apple: { carbohydrate: 1, flavour: 2 },
    lemonade: { carbohydrate: 10, flavour: 20 },
    burger: { carbohydrate: 5, fat: 7, flavour: 3 },
    eggs: { protein: 5, fat: 1, flavour: 1 },
    turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 },
  };

  return (order) => {
    let [instr, el, q] = order.split(' ');
    if (instr === 'restock') {
      products[el] += Number(q);
      return 'Success';
    } else if (instr === 'prepare') {
      for (const key in meals[el]) {
        if (meals[el][key] * Number(q) <= products[key]) {
          products[key] -= meals[el][key] * Number(q);
        } else {
          return `Error: not enough ${key} in stock`;
        }
      }
      return 'Success';
    } else if (instr === 'report') {
      let productReportList = [];
      for (const key in products) {
        productReportList.push(`${key}=${products[key]}`);
      }
      return productReportList.join(' ');
    }
  };
}

let manager = solution();
console.log(manager('restock flavour 50'));
console.log(manager('prepare lemonade 4'));
console.log(manager('restock carbohydrate 10'));
console.log(manager('restock flavour 10'));
console.log(manager('prepare apple 1'));
console.log(manager('restock fat 10'));
console.log(manager('prepare burger 1'));
console.log(manager('report'));
