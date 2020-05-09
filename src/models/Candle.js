import Sequelize from "sequelize";
import db from "../db/db";

const Candle = db.define(
  "candle",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    openTime: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    closeTime: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    open: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    high: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    low: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    close: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    volume: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    trades: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Candle.sync({
  force: false, // if you change this the table will be dropped
});

export default Candle;
