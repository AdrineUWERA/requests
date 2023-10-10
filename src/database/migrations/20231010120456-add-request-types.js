import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface) => {
    await queryInterface.addColumn("requests", "type", {
      type: DataTypes.ENUM("ADMINISTRATIVE", "ACADEMIC"),
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("requests", "type");
  },
};
