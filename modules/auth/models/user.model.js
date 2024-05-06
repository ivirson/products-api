const Sequelize = require("sequelize");
const sequelize = require("../../../infra/db");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profession: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birthDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  documentNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  income: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

User.sync();

module.exports = User;
