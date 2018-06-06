const Trip = require('./server/models/Trip');
const User = require('./server/models/User');
const Expense = require('./server/models/Expense');
const faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/trip");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", () => {

    const categories = ["Travel", "Food", "Shopping"];

    for(let user_id = 0; user_id < 5; ++user_id) {
        const user = new User({ name: faker.name.findName(), email: faker.internet.email() });
        user.save(() => {
            for(let trip_id = 0; trip_id < 5; ++trip_id) {
                const trip = new Trip({
                    title: faker.lorem.word(),
                    description: faker.lorem.sentence(),
                    author: user._id
                });
                trip.save(() => {
                    const expense = new Expense ({
                        title: faker.lorem.word(),
                        category: categories[Math.floor(Math.random()*categories.length)],
                        cost: faker.random.number(),
                        trip: trip._id
                    });
                    expense.save();
                });
                console.log(user);
            }
        });
    };
});

process.exit(0);
