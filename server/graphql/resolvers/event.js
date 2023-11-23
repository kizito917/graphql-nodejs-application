// Models imports
const eventModel = require('../../models/event');
const userModel = require('../../models/user');

module.exports = {
    events: async () => {
        const events = await eventModel.find({}).populate('creator');
        return events;
    },
    fetchSingleEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        
        const event = await eventModel.findOne({_id: args.eventId}).populate('creator');
        return event;
    },
    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        
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
    updateEvent: async ({ eventInput, eventId }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }

        const updatedEvent = await eventModel.findByIdAndUpdate({_id: eventId}, {$set: eventInput}, { new: true });
        return updatedEvent;
    }
}