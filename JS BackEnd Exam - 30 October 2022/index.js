const PORT = 3000;

async function main() {
    const app = require('express')();

    await require('./config/database')(app);
    require('./config/express')(app);
    require('./config/routes')(app);

    app.listen(PORT, console.log(`Listening on port ${PORT}!`));
}

main();
