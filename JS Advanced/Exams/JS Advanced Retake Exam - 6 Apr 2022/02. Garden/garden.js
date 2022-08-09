class Garden {
    constructor(spaceAvailable) {
        this.spaceAvailable = spaceAvailable;
        this.plants = [];
        this.storage = [];
    }

    addPlant(plantName, spaceRequired) {
        if (spaceRequired > this.spaceAvailable) {
            throw new Error('Not enough space in the garden.');
        } else {
            this.spaceAvailable -= spaceRequired;
            this.plants.push({ plantName, spaceRequired, ripe: false, quantity: 0 });
            return `The ${plantName} has been successfully planted in the garden.`;
        }
    }
    ripenPlant(plantName, quantity) {
        if (!this.plants.some((x) => x.plantName === plantName)) {
            throw new Error(`There is no ${plantName} in the garden.`);
        }
        if (quantity <= 0) {
            throw new Error('The quantity cannot be zero or negative.');
        }

        let plantObj = this.plants.find((x) => x.plantName === plantName);

        if (plantObj.ripe === true) {
            throw new Error(`The ${plantName} is already ripe.`);
        }

        plantObj.ripe = true;
        plantObj.quantity += quantity;

        return quantity === 1
            ? `${quantity} ${plantName} has successfully ripened.`
            : `${quantity} ${plantName}s have successfully ripened.`;
    }
    harvestPlant(plantName) {
        if (!this.plants.some((x) => x.plantName === plantName)) {
            throw new Error(`There is no ${plantName} in the garden.`);
        }

        let plantObj = this.plants.find((x) => x.plantName === plantName);

        if (plantObj.ripe === false) {
            throw new Error(`The ${plantName} cannot be harvested before it is ripe.`);
        }

        this.spaceAvailable += plantObj.spaceRequired;
        this.storage.push({ plantName, quantity: plantObj.quantity });

        this.plants = this.plants.filter((x) => x.plantName !== plantName);

        return `The ${plantName} has been successfully harvested.`;
    }
    generateReport() {
        let report = [];
        let storage = [];

        this.plants.sort((a, b) => a.plantName.localeCompare(b.plantName)).forEach((x) => report.push(x.plantName));
        this.storage.forEach((plant) => storage.push(`${plant.plantName} (${plant.quantity})`));

        return `The garden has ${this.spaceAvailable} free space left.\n
                Plants in the garden: ${report.join(', ')}\n
                Plants in storage: ${this.storage.length ? storage.join(', ') : 'The storage is empty.'}`;
    }
}

const myGarden = new Garden(250);
console.log(myGarden.addPlant('apple', 20));
console.log(myGarden.addPlant('orange', 200));
console.log(myGarden.addPlant('raspberry', 10));
console.log(myGarden.ripenPlant('apple', 10));
console.log(myGarden.ripenPlant('orange', 1));
console.log(myGarden.harvestPlant('orange'));
console.log(myGarden.generateReport());
