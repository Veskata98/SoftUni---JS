class CarDealership {
    constructor(name) {
        this.name = name;
        this.availableCars = [];
        this.soldCars = [];
        this.totalIncome = 0;
    }
    addCar(model, horsepower, price, mileage) {
        if (model === '' || horsepower < 0 || price < 0 || mileage < 0) {
            throw new Error('Invalid input!');
        } else {
            this.availableCars.push({ model, horsepower, price, mileage });
            return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`;
        }
    }
    sellCar(model, desiredMileage) {
        if (!this.availableCars.some((car) => car.model === model)) {
            throw new Error(`${model} was not found!`);
        } else {
            let carToBeSold = this.availableCars.find((car) => car.model === model);
            if (carToBeSold.mileage - desiredMileage > 40000) {
                carToBeSold.price *= 0.9;
            } else if (carToBeSold.mileage - desiredMileage <= 40000 && carToBeSold.mileage - desiredMileage > 0) {
                carToBeSold.price *= 0.95;
            }
            this.soldCars.push({
                model,
                horsepower: carToBeSold.horsepower,
                soldPrice: carToBeSold.price,
            });
            this.totalIncome += carToBeSold.price;
            this.availableCars.splice(this.availableCars.indexOf(carToBeSold), 1);
            return `${model} was sold for ${carToBeSold.price.toFixed(2)}$`;
        }
    }
    currentCar() {
        if (!this.availableCars.length) {
            return 'There are no available cars';
        } else {
            let result = ['-Available cars:'];
            this.availableCars.forEach((car) =>
                result.push(
                    `---${car.model} - ${car.horsepower} HP - ${car.mileage.toFixed(2)} km - ${car.price.toFixed(2)}$`
                )
            );
            return result.join('\n');
        }
    }
    salesReport(criteria) {
        if (criteria != 'horsepower' && criteria != 'model') {
            throw new Error('Invalid criteria!');
        } else {
            let sortedReport = [
                `-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$`,
                `-${this.soldCars.length} cars sold:`,
            ];
            if (criteria == 'horsepower') {
                this.soldCars
                    .sort((a, b) => b.horsepower - a.horsepower)
                    .forEach((car) =>
                        sortedReport.push(`---${car.model} - ${car.horsepower} HP - ${car.soldPrice.toFixed(2)}$`)
                    );
            } else {
                this.soldCars
                    .sort((a, b) => a.model.localeCompare(b.model))
                    .forEach((car) =>
                        sortedReport.push(`---${car.model} - ${car.horsepower} HP - ${car.soldPrice.toFixed(2)}$`)
                    );
            }
            return sortedReport.join('\n');
        }
    }
}

let dealership = new CarDealership('SoftAuto');
dealership.addCar('Toyota Corolla', 100, 3500, 190000);
dealership.addCar('Mercedes C63', 300, 29000, 187000);
dealership.addCar('Audi A3', 120, 4900, 240000);
dealership.sellCar('Toyota Corolla', 230000);
dealership.sellCar('Mercedes C63', 110000);
console.log(dealership.salesReport('horsepower'));
