function solve() {
  document.querySelector('#btnSend').addEventListener('click', onClick);

  function onClick() {
    let data = JSON.parse(document.querySelector('#inputs textarea').value);
    let bestRestaurantElement = document.querySelector('#bestRestaurant p');
    let workersElement = document.querySelector('#workers p');

    let avgSalary = 0;
    let bestRestaurantKey = '';
    let restaurants = {};

    for (const line of data) {
      let [restaurantName, workers] = line.split(' - ');
      workers = workers.split(', ');
      let workersList = {};

      if (restaurants.hasOwnProperty(restaurantName)) {
        for (const worker of workers) {
          let [workerName, salary] = worker.split(' ');
          restaurants[restaurantName][workerName] = +salary;
        }
      } else {
        for (const worker of workers) {
          let [workerName, salary] = worker.split(' ');
          workersList[workerName] = +salary;
        }
        restaurants[restaurantName] = workersList;
      }
    }

    for (const key in restaurants) {
      let tempAvgSalaray = 0;
      let totalSalary = 0;
      Object.values(restaurants[key]).forEach(
        (x) => (totalSalary += Number(x))
      );
      tempAvgSalaray = totalSalary / Object.values(restaurants[key]).length;
      if (tempAvgSalaray > avgSalary) {
        avgSalary = tempAvgSalaray;
        bestRestaurantKey = key;
      }
    }

    let bestSalary = Math.max(...Object.values(restaurants[bestRestaurantKey]));

    bestRestaurantElement.textContent = `Name: ${bestRestaurantKey} Average Salary: ${avgSalary.toFixed(
      2
    )} Best Salary: ${bestSalary.toFixed(2)}`;

    let workersData = [];

    Object.entries(restaurants[bestRestaurantKey])
      .sort((a, b) => b[1] - a[1])
      .forEach((x) => {
        workersData.push(`Name: ${x[0]} With Salary: ${x[1]}`);
      });

    workersElement.textContent = workersData.join(' ');
  }
}
