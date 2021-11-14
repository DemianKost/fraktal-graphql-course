const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/main');

const app = express();

app.use(cors());

mongoose.connect(""); // Сюда вставить свой токен кластера для конекта
mongoose.connection.once('open', () => {
  console.log('We connected to the MongoDB');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}) );

app.listen(4000, () => {
  console.log( 'App listening on port 4000' );
});
