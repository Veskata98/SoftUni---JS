function area() {
  return Math.abs(this.x * this.y);
}

function vol() {
  return Math.abs(this.x * this.y * this.z);
}

function solve(area, vol, input) {
  let coordinates = JSON.parse(input);

  let resultArr = [];
  for (const point of coordinates) {
    let obj = {};
    obj['area'] = area.call(point);
    obj['volume'] = vol.call(point);
    resultArr.push(obj);
  }
  return resultArr;
}

solve(
  area,
  vol,
  `[
{"x":"1","y":"2","z":"10"},
{"x":"7","y":"7","z":"10"},
{"x":"5","y":"2","z":"10"}
]`
);
