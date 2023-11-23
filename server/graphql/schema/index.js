const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Event {
        _id: ID!
        name: String!
        category: String!
        price: Float!
        date: String!
        creator: User!
    }

    type User {
        _id: ID!  
        name: String!
        email: String!
        password: String!
    }

    type AuthData {
        message: String!
        token: String!
    }

    input EventInput {
        name: String!
        category: String!
        price: Float!
        date: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    type RootQuery {
        events: [Event!]!
        fetchSingleEvent(eventId: String): Event!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        updateEvent(eventInput: EventInput, eventId: String): Event
        signInUser(email: String!, password: String!): AuthData!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);