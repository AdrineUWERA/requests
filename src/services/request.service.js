import Comment from "../database/models/comment.model";
import Request from "../database/models/request.model";
import User from "../database/models/user.model";

async function createRequest(details) {
  return await Request.create(details);
}

async function addComment(details) {
  return await Comment.create(details);
}

async function getById(id) {
  const request = await Request.findOne({
    where: { id: id },
    include: {
      model: Comment,
      as: "requestComment",
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["commenterId", "updatedAt"],
      },
      include: {
        model: User,
        as: "userComment",
        attributes: {
          exclude: [
            "id",
            "password",
            "createdAt",
            "updatedAt",
            "tfa_enabled",
            "status",
          ],
        },
      },
    },
    order: [["createdAt", "DESC"]],
  });
  let receiver;
  let sender;
  if (request) {
    sender = await User.findOne({
      where: { id: request.senderId },
      attributes: {
        exclude: [
          "id",
          "password",
          "createdAt",
          "updatedAt",
          "tfa_enabled",
          "status",
        ],
      },
    });
    receiver = await User.findOne({
      where: { id: request.receiverId },
      attributes: {
        exclude: [
          "id",
          "password",
          "createdAt",
          "updatedAt",
          "tfa_enabled",
          "status",
        ],
      },
    });
  }

  return {
    ...request.dataValues,
    sender: sender.dataValues,
    receiver: receiver.dataValues,
  };
}

async function getBySender(id) {
  return await Request.findAll({
    where: { senderId: id },
    order: [["createdAt", "DESC"]],
  });
}

async function getByReceiver(id) {
  return await Request.findAll({
    where: { receiverId: id },
    order: [["createdAt", "DESC"]],
  });
}

export default {
  createRequest,
  getById,
  getBySender,
  getByReceiver,
  addComment,
};
