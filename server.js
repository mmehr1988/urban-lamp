'use strict';
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3000;

const models = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TURN ON ROUTES
app.use(routes);

////////////////////////////////////////////////////////////
// FILE PATH: QUESTIONS
////////////////////////////////////////////////////////////

const { confirmQuery } = require('./lib/Prompts.js');

////////////////////////////////////////////////////////////
// TURN ON CONNECTION TO DB + SERVER
////////////////////////////////////////////////////////////

async function main() {
  try {
    await sequelize.sync({ force: false });
    // await app.listen(PORT);
    await confirmQuery();
  } catch (err) {
    console.log(err);
  }
}
main();
