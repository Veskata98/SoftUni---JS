function solve(input) {
    let heroesCount = input.shift();

    let heroes = {};

    for (let i = 0; i < heroesCount; i++) {
        let [name, hp, mana] = input.shift().split(' ');
        hp = Number(hp);
        mana = Number(mana);
        heroes[name] = { hp, mana };
    }

    for (const line of input) {
        let [action, hero, ...other] = line.split(' - ');
        switch (action) {
            case 'CastSpell':
                let manaNeededToCast = Number(other[0]);
                let spellName = other[1];
                if (heroes[hero].mana >= manaNeededToCast) {
                    heroes[hero].mana -= manaNeededToCast;
                    console.log(`${hero} has successfully cast ${spellName} and now has ${heroes[hero].mana} MP!`);
                } else {
                    console.log(`${hero} does not have enough MP to cast ${spellName}!`);
                }
                break;

            case 'TakeDamage':
                let takenDmg = Number(other[0]);
                let attacker = other[1];
                heroes[hero].hp -= takenDmg;
                if (heroes[hero].hp > 0) {
                    console.log(
                        `${hero} was hit for ${takenDmg} HP by ${attacker} and now has ${heroes[hero].hp} HP left!`
                    );
                } else {
                    console.log(`${hero} has been killed by ${attacker}!`);
                    delete heroes[hero];
                }
                break;

            case 'Recharge':
                let rechargeAmount = Number(other[0]);
                if (heroes[hero].mana + rechargeAmount > 200) {
                    rechargeAmount = 200 - heroes[hero].mana;
                }
                heroes[hero].mana += rechargeAmount;
                console.log(`${hero} recharged for ${rechargeAmount} MP!`);
                break;

            case 'Heal':
                let healedAmount = Number(other[0]);
                if (heroes[hero].hp + healedAmount > 100) {
                    healedAmount = 100 - heroes[hero].hp;
                }
                heroes[hero].hp += healedAmount;
                console.log(`${hero} healed for ${healedAmount} HP!`);
                break;
            default:
                break;
        }
    }
    Object.entries(heroes).forEach((hero) => console.log(`${hero[0]}\n  HP: ${hero[1].hp}\n  MP: ${hero[1].mana}`));
}

solve([
    4,
    'Adela 90 150',
    'SirMullich 70 40',
    'Ivor 1 111',
    'Tyris 94 61',
    'Heal - SirMullich - 50',
    'Recharge - Adela - 100',
    'CastSpell - Tyris - 1000 - Fireball',
    'TakeDamage - Tyris - 99 - Fireball',
    'TakeDamage - Ivor - 3 - Mosquito',
    'End',
]);
