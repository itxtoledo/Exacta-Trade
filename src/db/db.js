import Sequelize from "sequelize";

export default new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  pool: {
    max: 3,
    min: 1,
    acquire: 30000,
    idle: 15000,
  },
  logging: true,
});
