// function solve(array) {
//   let map = new Map();
//   //let newArray = array.split(", ");
//   let timeToParty = false;
//   let totalCount = 0;
//   let count = 0;

//   for (let string of array) {
//     let check = string[0];
//     let vipState = false;
//     if (!isNaN(check)) vipState = true;

//     if (string === "PARTY") {
//       timeToParty = true;
//     } else if (!timeToParty) {
//       map.set(string, vipState ? 1 : 0);
//       totalCount++;
//     } else if (timeToParty) {
//       if (map.set(string)) count++;
//     }
//   }

//   let mapAsc = new Map([...map].sort((a, b) => b[1] - a[1]));
//   console.log(totalCount - count);
//   for (const [number, vip] of mapAsc) {
//     if (vip !== undefined) console.log(number);
//   }
// }

// solve([
//   "7IK9Yo0h",
//   "9NoBUajQ",
//   "SVQXQCbc",
//   "tSzE5t0p",
//   "Ce8vwPmE",
//   "PARTY",
//   "9NoBUajQ",
//   "Ce8vwPmE",
//   "SVQXQCbc",
// ]);

// function cardGame(input) {
//   let map = new Map();
//   for (let i = 0; i < input.length; i++) {
//     let name = input[i].slice(0, input[i].indexOf(":"));
//     let cards = input[i].slice(input[i].indexOf(":") + 2, input[i].length);
//     if (!map.get(name)) map.set(name, cards);
//     else {
//       let newCards = map.get(name) + ", " + cards;
//       map.set(name, newCards);
//     }
//   }

//   let mapAsc = new Map([...map].sort((a, b) => b[1] - a[1]));

//   for (const [name, cards] of mapAsc) {
//     let uniq = [...new Set(cards.split(", "))];
//     let result = 0;
//     let power = "";
//     let type = "";
//     for (const iterator of uniq) {
//       if (!iterator.includes("10")) {
//         power = iterator[0];
//         type = iterator[1];
//       } else {
//         power = iterator[0] + iterator[1];
//         type = iterator[2];
//       }
//       if (power === "J") power = 11;
//       else if (power === "Q") power = 12;
//       else if (power === "K") power = 13;
//       else if (power === "A") power = 14;

//       if (type === "S") type = 4;
//       else if (type === "H") type = 3;
//       else if (type === "D") type = 2;
//       else if (type === "C") type = 1;

//       result += Number(power) * Number(type);
//     }
//     console.log(`${name}: ${result}`);
//   }
// }

// cardGame([
//   "John: 2C, 4H, 9H, AS, QS",
//   "Slav: 3H, 10S, JC, KD, 5S, 10S",
//   "Alex: 6H, 7S, KC, KD, 5S, 10C",
//   "Thomas: QH, QC, JS, JD, JC",
//   "Slav: 6H, 7S, KC, KD, 5S, 10C",
//   "Thomas: QH, QC, JS, JD, JC",
//   "Alex: 6H, 7S, KC, KD, 5S, 10C",
//   "Thomas: QH, QC, JS, JD, JC",
//   "John: JD, JD, JD, JD",
// ]);

// function minerTask(input) {
//   let map = new Map();
//   let index = 0;
//   while (index < input.length) {
//     let resourse = input[index];
//     let quantity = input[index + 1];
//     if (!map.get(resourse)) {
//       map.set(resourse, quantity);
//     } else {
//       let old = map.get(resourse);
//       map.set(resourse, Number(old) + Number(quantity));
//     }
//     index += 2;
//   }
//   // for (const user of input) {
//   //   let company = user.split(" -> ").shift();
//   //   let id = user.split(" -> ")[1];
//   //   if (!map.get(company)) {
//   //     map.set(company, id);
//   //   } else {
//   //     let old = map.get(company);
//   //     map.set(company, old + " " + id);
//   //   }
//   // }

//   //let mapAsc = new Map([...map].sort());

//   for (const [company, id] of map) {
//     // let separedId = id.split(" ");
//     // let uniq = [...new Set(separedId)];
//     console.log(`${company} -> ${id}`);
//     // for (const idIterator of uniq) {
//     //   console.log("-- " + idIterator);
//     // }
//   }
// }

// minerTask(["gold", "155", "silver", "10", "copper", "17", "gold", "15"]);

// function travelTime(input) {
//   let map = new Map();
//   for (const string of input) {
//     let country = string.split(" > ").shift();
//     let destination = string.split(" > ").slice(1, string.length);
//     let town = destination[0];
//     let price = destination[1];
//     if (!map.get(country)) {
//       map.set(country, town + " " + price);
//     } else {
//       let old = map.get(country);
//       let oldArray = old.split(" ");
//       if (oldArray.includes(town)) {
//         if (oldArray[oldArray.indexOf(town) + 1] > price)
//           oldArray[oldArray.indexOf(town) + 1] = price;
//         map.set(country, oldArray.join(" "));
//       } else {
//         map.set(country, old + " " + town + " " + price);
//       }
//     }
//   }
//   let mapAsc = new Map([...map].sort(Intl.Collator().compare));

//   for (const [country, destination] of mapAsc) {
//     let mapId = new Map();
//     let separedId = destination.split(" ");
//     let result = [];
//     result.push(country + " ->");
//     for (let i = 0; i < separedId.length; i += 2) {
//       mapId.set(separedId[i], separedId[i + 1]);
//     }
//     let sortedMap = new Map([...mapId].sort((a, b) => a[1] - b[1]));
//     for (const [town, price] of sortedMap) {
//       result.push(`${town} -> ${price}`);
//     }
//     console.log(result.join(" "));
//   }
// }

// travelTime([
//   "aaa > Sofia > 15",
//   "aaa > Sofia > 50",
//   "Bulgaria > Sofia > 25000",
//   "Bulgaria > Sofia > 250000",
//   "Kalimdor > Orgrimar > 25000",
//   "Albania > Tirana > 25000",
//   "Bulgaria > Varna > 25010",
//   "Bulgaria > Lukovit > 10",
// ]);

// function arenaTier(array) {
//   let map = new Map();
//   for (const string of array) {
//     let command = string.split(" ");
//     let gladiator = command[0];
//     if (command.includes("vs")) {
//       let skillA = map.get(command[0]);
//       let skillB = map.get(command[2]);
//       if (skillA === undefined || skillB === undefined) break;
//       for (let elA in skillA) {
//         for (let elB in skillB) {
//           if (elA === elB) {
//             if (skillA[elA] > skillB[elB]) {
//               map.delete(command[2]);
//             } else if (skillA[elA] < skillB[elB]) {
//               map.delete(command[0]);
//             }
//           }
//         }
//       }
//     } else if (command.join(" ") === "Ave Cesar") {
//       break;
//     } else {
//       if (!map.get(gladiator)) {
//         let newArr = {};
//         let name = command[2];
//         newArr[name] = command[4];
//         map.set(gladiator, newArr);
//       } else {
//         let oldSkill = map.get(gladiator);
//         let newSkill = {};
//         let skillName = command[2];
//         newSkill[skillName] = command[4];
//         let newArr = {
//           ...oldSkill,
//           ...newSkill,
//         };
//         if (!oldSkill.hasOwnProperty(command[2])) map.set(gladiator, newArr);
//         if (
//           oldSkill.hasOwnProperty(command[2]) &&
//           oldSkill[command[2]] < command[4]
//         ) {
//           oldSkill[command[2]] = command[4];
//           let changedArr = oldSkill;
//           map.set(gladiator, changedArr);
//         }
//       }
//     }
//   }

//   let result = [];
//   for (const [gladiatorName, skillsAll] of map) {
//     let skills = Object.entries(skillsAll);
//     let sum = skills.map((a) => a[1]).reduce((a, b) => Number(a) + Number(b));
//     result.push([gladiatorName, skills, Number(sum)]);
//   }

//   result.sort((a, b) => b[2] - a[2] || a[0].localeCompare(b[0]));

//   for (let part of result) {
//     console.log(`${part[0]}: ${part[2]} skill`);
//     let sorted = part[1].sort(
//       (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
//     );
//     for (const iterator of sorted) {
//       console.log(`- ${iterator[0]} <!> ${iterator[1]}`);
//     }
//   }
// }

// arenaTier([
//   "Peter -> Duck -> 400",
//   "Julius -> Shield -> 150",
//   "Gladius -> Heal -> 200",
//   "Gladius -> Support -> 250",
//   "Gladius -> Shield -> 250",
//   "Peter vs Gladius",
//   "Gladius vs Julius",
//   "Gladius vs Maximilian",
//   "Ave Cesar",
// ]);

// function solve(arr) {
//   let list = {};
//   for (let el of arr) {
//     if (el === "Ave Cesar") {
//       break;
//     } else if (el.includes(" -> ")) {
//       add(el);
//     } else if (el.includes(" vs ")) {
//       battle(el);
//     }
//   }
//   let tier = Object.entries(list);
//   let array = [];
//   for (let elem of tier) {
//     let name = elem[0];
//     let pow = Object.entries(elem[1]);
//     let sum = pow.map((a) => a[1]).reduce((a, b) => a + b);
//     array.push([name, pow, sum]);
//   }
//   array.sort((a, b) => b[2] - a[2] || a[0].localeCompare(b[0]));
//   for (let part of array) {
//     console.log(`${part[0]}: ${part[2]} skill`);
//     part[1]
//       .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
//       .map((x) => console.log(`- ${x[0]} <!> ${x[1]}`));
//   }

//   function add(el) {
//     let [gladiator, skill, power] = el.split(" -> ");
//     power = Number(power);
//     if (!list.hasOwnProperty(gladiator)) {
//       list[gladiator] = {};
//       list[gladiator][skill] = power;
//     } else {
//       if (!list[gladiator].hasOwnProperty(skill)) {
//         list[gladiator][skill] = power;
//       } else {
//         let oldPow = list[gladiator][skill];
//         if (power > oldPow) {
//           list[gladiator][skill] = power;
//         }
//       }
//     }
//   }
//   function battle(el) {
//     let [gladiatorA, gladiatorB] = el.split(" vs ");
//     if (list.hasOwnProperty(gladiatorA) && list.hasOwnProperty(gladiatorB)) {
//       let skillA = list[gladiatorA];
//       let skillB = list[gladiatorB];
//       for (let elA in skillA) {
//         for (let elB in skillB) {
//           if (elA === elB) {
//             if (skillA[elA] > skillB[elB]) {
//               delete list[gladiatorB];
//             } else if (skillA[elA] < skillB[elB]) {
//               delete list[gladiatorA];
//             }
//           }
//         }
//       }
//     }
//   }
// }

// solve([
//   "Peter -> Duck -> 400",
//   "Julius -> Shield -> 150",
//   "Gladius -> Heal -> 200",
//   "Gladius -> Support -> 250",
//   "Gladius -> Shield -> 250",
//   "Peter vs Gladius",
//   "Gladius vs Julius",
//   "Gladius vs Maximilian",
//   "Ave Cesar",
// ]);

// function legendaryFarming(input) {
//   let arr = input.split(" ");
//   let incomeArray = {};
//   for (let i = 0; i < arr.length; i += 2) {
//     if (
//       incomeArray.fragments >= 250 ||
//       incomeArray.shards >= 250 ||
//       incomeArray.motes >= 250
//     )
//       break;
//     if (!incomeArray.hasOwnProperty(arr[i + 1].toLowerCase())) {
//       incomeArray[arr[i + 1].toLowerCase()] = Number(arr[i]);
//     } else {
//       oldValue = Number(incomeArray[arr[i + 1].toLowerCase()]);
//       incomeArray[arr[i + 1].toLowerCase()] = oldValue + Number(arr[i]);
//     }
//   }
//   if (incomeArray.fragments >= 250) {
//     console.log("Valanyr obtained!");
//     incomeArray.fragments -= 250;
//   } else if (incomeArray.shards >= 250) {
//     console.log("Shadowmourne obtained!");
//     incomeArray.shards -= 250;
//   } else if (incomeArray.motes >= 250) {
//     console.log("Dragonwrath obtained!");
//     incomeArray.motes -= 250;
//   }

//   if (!incomeArray.hasOwnProperty("fragments")) incomeArray.fragments = 0;
//   if (!incomeArray.hasOwnProperty("shards")) incomeArray.shards = 0;
//   if (!incomeArray.hasOwnProperty("motes")) incomeArray.motes = 0;

//   let res = [];
//   let keyMaterials = [];
//   let junk = [];
//   for (const property in incomeArray) {
//     if (
//       property === "fragments" ||
//       property === "shards" ||
//       property === "motes"
//     )
//       keyMaterials.push([property, incomeArray[property]]);
//     else junk.push([property, incomeArray[property]]);
//   }

//   keyMaterials.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
//   junk.sort();

//   res = keyMaterials.concat(junk);

//   for (const iterator of res) {
//     console.log(`${iterator[0]}: ${iterator[1]}`);
//   }
// }

// legendaryFarming(
//   "123 silver 6 shards 8 shards 5 motes 9 fangs 75 motes 103 MOTES 8 Shards 86 Motes 7 stones 19 silver"
// );

// function garage(input) {
//   let garage = {};
//   let array = [];
//   for (const iterator of input) {
//     let garageNumber = Number(iterator[0]);
//     let carDescription = iterator.slice(
//       iterator.indexOf("-") + 2,
//       iterator.length
//     );
//     if (array.includes(carDescription)) continue;
//     array.push(carDescription);
//     let separated = carDescription.split(", ");
//     let tempArr = [];
//     if (!garage.hasOwnProperty(garageNumber)) garage[garageNumber] = [];
//     for (const string of separated) {
//       let correctedString = string.replace(":", " -");
//       tempArr.push(correctedString);
//     }
//     //if (!garage[garageNumber] === tempArr) continue;
//     garage[garageNumber].push(tempArr);
//   }

//   for (const property in garage) {
//     console.log(`Garage № ${property}`);
//     let carDescription = garage[property];
//     for (let i = 0; i < carDescription.length; i++) {
//       console.log(`--- ${carDescription[i].join(", ")}`);
//     }
//   }
// }

// garage([
//   "1 - color: blue, fuel type: diesel",
//   "3 - color: blue, fuel type: diesel",
//   "1 - color: red, manufacture: Audi",
//   "2 - fuel type: petrol",
//   "4 - color: dark blue, fuel type: diesel, manufacture: Fiat",
// ]);

// function garage(input) {
//   let garages = [];
//   for (const line of input) {
//     let [garageNumber, carInfo] = line.split(" - ");
//     let found = garages.find((g) => g.garageNumber === garageNumber);
//     if (!found) {
//       garages.push({
//         garageNumber: garageNumber,
//         carInfo: [],
//       });
//       found = garages.find((g) => g.garageNumber === garageNumber);
//     }
//     found.carInfo.push(carInfo);
//   }
//   let output = "";
//   garages.forEach((garage) => {
//     output += `Garage № ${garage.garageNumber}\n`;
//     for (let currCar of garage.carInfo) {
//       currCar = currCar.replace(/: /g, " - ");
//       output += `--- ${currCar}\n`;
//     }
//   });
//   console.log(output);
// }

// garage([
//   "1 - color: blue, fuel type: diesel",
//   "3 - color: blue, fuel type: diesel",
//   "1 - color: red, manufacture: Audi",
//   "2 - fuel type: petrol",
//   "4 - color: dark blue, fuel type: diesel, manufacture: Fiat",
// ]);

function foreignCountry(country) {
  if (country === ("USA" || "England")) {
    console.log("English");
  } else if (
    country === "Spain" ||
    country === "Argentina" ||
    country === "Mexico"
  ) {
    console.log("Spanish");
  } else {
    console.log("unknown");
  }
}

foreignCountry("USA");
foreignCountry("England");
foreignCountry("Spain");
foreignCountry("Bulgaria");
