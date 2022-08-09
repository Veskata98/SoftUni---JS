class VegetableStore {
    constructor(owner, location) {
        this.owner = owner;
        this.location = location;
        this.availableProducts = [];
    }
    loadingVegetables(vegetables) {
        let addedTypes = [];
        vegetables.forEach((x) => {
            let [type, quantity, price] = x.split(' ');
            quantity = Number(quantity);
            price = Number(price);

            addedTypes.push(type);

            const vegetableInArray = this.availableProducts.find((x) => x.type === type);
            if (!vegetableInArray) {
                this.availableProducts.push({ type, quantity, price });
            } else {
                vegetableInArray.quantity += quantity;
                if (price > vegetableInArray.price) {
                    vegetableInArray.price = price;
                }
            }
        });
        return `Successfully added ${Array.from(new Set(addedTypes)).join(', ')}`;
    }
    buyingVegetables(selectedProducts) {
        let totalPrice = 0;
        selectedProducts.forEach((x) => {
            let [type, quantity] = x.split(' ');
            const vegetableInArray = this.availableProducts.find((x) => x.type === type);
            if (!vegetableInArray) {
                throw new Error(
                    `${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`
                );
            }
            if (vegetableInArray.quantity < quantity) {
                throw new Error(
                    `The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(
                        2
                    )}.`
                );
            }
            totalPrice += quantity * vegetableInArray.price;
            vegetableInArray.quantity -= quantity;
        });
        return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`;
    }
    rottingVegetable(type, quantity) {
        const vegetableInArray = this.availableProducts.find((x) => x.type === type);
        if (!vegetableInArray) {
            throw new Error(`${type} is not available in the store.`);
        }
        if (vegetableInArray.quantity < quantity) {
            vegetableInArray.quantity = 0;
            return `The entire quantity of the ${type} has been removed.`;
        }
        vegetableInArray.quantity -= quantity;
        return `Some quantity of the ${type} has been removed.`;
    }
    revision() {
        let resultArr = ['Available vegetables:'];
        this.availableProducts
            .sort((a, b) => a.price - b.price)
            .forEach((x) => resultArr.push(`${x.type}-${x.quantity}-$${x.price}`));
        resultArr.push(`The owner of the store is ${this.owner}, and the location is ${this.location}.`);
        return resultArr.join('\n');
    }
}

let vegStore = new VegetableStore('Jerrie Munro', '1463 Pette Kyosheta, Sofia');
console.log(vegStore.loadingVegetables(['Okra 2.5 3.5', 'Beans 10 2.8', 'Celery 5.5 2.2', 'Celery 0.5 2.5']));
console.log(vegStore.rottingVegetable('Okra', 1));
console.log(vegStore.rottingVegetable('Okra', 2.5));
console.log(vegStore.buyingVegetables(['Beans 8', 'Celery 1.5']));
console.log(vegStore.revision());
