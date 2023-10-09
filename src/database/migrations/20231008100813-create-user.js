import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        allowNull: false,
      },fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      tfa_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      role: {
        type: DataTypes.ENUM("STUDENT", "ADMINISTRATOR", "FACILITATOR"),
        defaultValue: "STUDENT",
      },
      status: {
        type: DataTypes.ENUM("INACTIVE", "ACTIVE"),
        defaultValue: "ACTIVE",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
