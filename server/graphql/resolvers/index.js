const eventResolver = require('./event');
const userResolver = require('./auth');

const rootResolver = {
    ...eventResolver,
    ...userResolver,
}

module.exports = rootResolver;