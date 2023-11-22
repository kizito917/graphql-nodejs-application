const bcrypt = require('bcryptjs');

// Models imports
const eventModel = require('../../models/event');
const userModel = require('../../models/user');

module.exports = {
    events: async () => {
        const events = await eventModel.find({}).populate('creator');
        return events;
    },
    createEvent: async (args) => {
        const { name, category, price, date } = args.eventInput;
        try {
            const event = new eventModel({
                name: name,
                category: category,
                price: +price,
                date: new Date(date),
                creator: '6543d3a3c651a1630cad9c2a'
            });
            const result = await event.save();

            const userDetails = await userModel.findById({_id: '6543d3a3c651a1630cad9c2a'});
            userDetails.createdEvents.push(result._id);
            userDetails.save();

            return result;
        } catch (err) {
            throw new Error;
        }
    },
    createUser: async (args) => {
        const { name, email, password } = args.userInput;
        try {
            const user = await userModel.findOne({ email });
            if (user) {
                return new Error('User already exists');
            }

            const userData = new userModel({
                name,
                email,
                password: await bcrypt.hash(password, 15),
            });
            await userData.save();

            return userData;
        } catch (err) {
            throw new Error;
        }
    }
}