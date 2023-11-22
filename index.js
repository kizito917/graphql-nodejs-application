const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const { graphqlHTTP } = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlRootResolver = require('./graphql/resolvers/index');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connection successful'))
    .catch((err) => console.log(`Error in connection db: ${err}`))

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlRootResolver,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`Graphql server live at port ${port}`);
});