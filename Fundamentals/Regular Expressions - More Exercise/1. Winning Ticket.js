function winningTicker(data) {
    let tickets = data.split(',');
    for (let ticket of tickets) {
        ticket = ticket.trim();
        if (ticket.length !== 20) {
            console.log('invalid ticket');
            continue;
        }

        if (!/[@#$\^]/g.test(ticket)) {
            console.log(`ticket "${ticket}" - no match`);
            continue;
        }

        let leftHalf = ticket.slice(0, 10);
        let rightHalf = ticket.slice(-10);

        let leftHalfRegEx =
            /(?<countAt>[@]{6,})|(?<countHashtag>[#]{6,})|(?<countDollar>[$]{6,})|(?<countCarrot>[\^]{6,})/g.exec(
                leftHalf
            );
        let rightHalfRegEx =
            /(?<countAt>[@]{6,})|(?<countHashtag>[#]{6,})|(?<countDollar>[$]{6,})|(?<countCarrot>[\^]{6,})/g.exec(
                rightHalf
            );
        let flag = false;
        if (leftHalfRegEx && rightHalfRegEx) {
            let leftValues = Object.values(leftHalfRegEx.groups);
            let rightValues = Object.values(rightHalfRegEx.groups);

            for (let i = 0; i < 4; i++) {
                if (leftValues[i] !== undefined && rightValues[i] !== undefined) {
                    if (leftValues[i].length > 5 && rightValues[i].length > 5) {
                        if (leftValues[i].length >= rightValues[i].length) {
                            console.log(
                                `ticket "${ticket}" - ${rightValues[i].length}${leftValues[i][0]}${
                                    leftValues[i].length === 10 && rightValues[i].length === 10 ? ' Jackpot!' : ''
                                }`
                            );
                        } else {
                            console.log(
                                `ticket "${ticket}" - ${leftValues[i].length}${leftValues[i][0]}${
                                    leftValues[i].length === 10 && rightValues[i].length === 10 ? ' Jackpot!' : ''
                                }`
                            );
                        }
                        flag = true;
                        break;
                    }
                }
            }
        }
        if (!flag) {
            console.log(`ticket "${ticket}" - no match`);
        }
    }
}
