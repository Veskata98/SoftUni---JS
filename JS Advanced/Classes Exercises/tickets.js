function solve(data, criteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }
    let tickets = [];

    for (const ticket of data) {
        let [destination, price, status] = ticket.split('|');
        price = Number(price);
        let newTicket = new Ticket(destination, price, status);
        tickets.push(newTicket);
    }
    criteria === 'price'
        ? tickets.sort((a, b) => a[criteria] - b[criteria])
        : tickets.sort((a, b) => a[criteria].localeCompare(b[criteria]));

    return tickets;
}

solve(
    [
        'Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed',
    ],
    'destination'
);
