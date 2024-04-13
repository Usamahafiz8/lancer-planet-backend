// src/models/index.js

const sequelize = require('../config/database');

const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    // Define models here
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initModels();

module.exports = sequelize;
