function solve(input) {
  let matches = input[0].match(
    /([\#|\|])[A-Za-z\s]+\1[\d]{2}\/[\d]{2}\/[\d]{2}\1\d+\1/g
  );
  if (matches) {
    let caloriesSum = 0;
    let resultLines = [];
    for (const match of matches) {
      let [food, date, calories] = match.slice(1).split(/[#|]/);
      caloriesSum += Number(calories);
      resultLines.push(
        `Item: ${food}, Best before: ${date}, Nutrition: ${calories}`
      );
    }
    console.log(
      `You have food to last you for: ${Math.floor(caloriesSum / 2000)} days!`
    );
    resultLines.forEach((x) => console.log(x));
  } else {
    console.log(`You have food to last you for: 0 days!`);
  }
}

solve([
  '$$#@@%^&#Fish#24/12/20#8500#|#Incorrect#19.03.20#450|$5*(@!#Ice Cream#03/10/21#9000#^#@aswe|Milk|05/09/20|2000|',
]);
