function spiceMustFlow(spiceYield) {
    let dayCount = 0;
    let spice = 0;
    while (spiceYield >= 100) {
        spice += spiceYield;
        dayCount++;
        if (spice >= 26) {
            spice -= 26;
        } else {
            spice = 0;
        }
        spiceYield -= 10;
    }
    console.log(dayCount);
    if (spice >= 26) {
        console.log(spice - 26);
    } else {
        console.log(0);
    }
}
