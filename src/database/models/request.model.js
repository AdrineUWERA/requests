import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./user.model";
import Comment from "./comment.model";

const Request = sequelize.define("requests", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("ADMINISTRATIVE", "ACADEMIC"),
    allowNull: false,
  },
});

Request.hasMany(Comment, {
  as: "requestComment",
  foreignKey: "requestId",
  onDelete: "CASCADE",
});

User.hasMany(Request, {
  as: "userRequest",
  foreignKey: "senderId",
  onDelete: "CASCADE",
});

User.hasMany(Request, {
  as: "receiverRequest",
  foreignKey: "receiverId",
  onDelete: "CASCADE",
});

export default Request;
