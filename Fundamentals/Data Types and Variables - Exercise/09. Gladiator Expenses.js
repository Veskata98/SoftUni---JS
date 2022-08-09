function gladiatorExpenses(losts, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    let helmetRepair = 0,
        swordRepair = 0,
        shieldRepair = 0,
        armorRepair = 0;

    for (let i = 1; i <= losts; i++) {
        if (i % 2 === 0) {
            helmetRepair++;
        }
        if (i % 3 === 0) {
            swordRepair++;
        }
        if (i % 2 === 0 && i % 3 === 0) {
            shieldRepair++;
        }
    }
    armorRepair = Math.floor(shieldRepair / 2);
    let sum =
        helmetPrice * helmetRepair + swordPrice * swordRepair + shieldPrice * shieldRepair + armorPrice * armorRepair;

    console.log(`Gladiator expenses: ${sum.toFixed(2)} aureus`);
}
