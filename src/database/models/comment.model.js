import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./user.model";

const Comment = sequelize.define("comments", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Comment.belongsTo(User, {
  as: "userComment",
  foreignKey: "commenterId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Comment;
