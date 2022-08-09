function solve(input, criteria) {
  let [option, value] = criteria.split('-');

  JSON.parse(input)
    .filter((x) => x[option] === value)
    .forEach((x, index) => {
      console.log(
        `${index}. ${x['first_name']} ${x['last_name']} - ${x['email']}`
      );
    });
}

// 0. Ardine Bassam - abassam0@cnn.com

solve(
  `[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`,
  'gender-Female'
);
