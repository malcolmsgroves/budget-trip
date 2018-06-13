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
                let expenses = [];
                for(let expense_id = 0; expense_id < 3; ++expense_id) {
                    const expense = new Expense ({
                        title: faker.lorem.word(),
                        category: categories[Math.floor(Math.random()*categories.length)],
                        cost: faker.random.number()
                    });
                    expenses.push(expense);
                }
                const trip = new Trip({
                    title: faker.lorem.word(),
                    description: faker.lorem.sentence(),
                    author: user._id,
                    expenses: [expenses]
                });
                console.log(user);
            }
        });
    };
});
