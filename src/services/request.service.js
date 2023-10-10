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
    include: [
      {
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
      {
        model: User,
        as: "sender",
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
      {
        model: User,
        as: "receiver",
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
    ],
    order: [["createdAt", "DESC"]],
  });

  return request;
}

async function getBySender({ userId, offset, limit }) {
  const requests = await Request.findAll({
    where: { senderId: userId },
    include: [
      {
        model: User,
        as: "sender",
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
      {
        model: User,
        as: "receiver",
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
    ],
    order: [["createdAt", "DESC"]],
    offset,
    limit,
  });

  const count = await Request.count({ where: { senderId: userId } });
  return { requests, count };
}

async function getByReceiver({ userId, offset, limit }) {
  const requests = await Request.findAll({
    where: { receiverId: userId },
    include: [
      {
        model: User,
        as: "sender",
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
      {
        model: User,
        as: "receiver",
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
    ],
    order: [["createdAt", "DESC"]],
    offset,
    limit,
  });

  const count = await Request.count({
    where: { receiverId: userId },
  });
  return { requests, count };
}

async function getAllRequest({ offset, limit }) {
  const requests = await Request.findAll({
    include: [
      {
        model: User,
        as: "sender",
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
      {
        model: User,
        as: "receiver",
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
    ],
    order: [["createdAt", "DESC"]],
    offset,
    limit,
  });

  const count = requests.length;

  return { requests, count };
}

export default {
  createRequest,
  getById,
  getBySender,
  getByReceiver,
  addComment,
  getAllRequest,
};
