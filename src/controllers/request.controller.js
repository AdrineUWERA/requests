import { requestServices } from "../services";

const sendRequest = async (req, res) => {
  const body = {
    subject: req.body.subject,
    message: req.body.message,
    receiverId: req.params.receiverId,
    senderId: req.user.id,
    type: req.body.type,
  };
  const sentRequest = await requestServices.createRequest(body);

  return res
    .status(201)
    .json({ code: 201, message: "Request sent", sentRequest });
};

const getUserRequest = async (req, res) => {
  const requests = await requestServices.getBySender(req.user.id);

  return res
    .status(200)
    .json({ code: 200, message: "Sent requests fetched", requests });
};

const getReceiverRequest = async (req, res) => {
  const requests = await requestServices.getByReceiver(req.user.id);

  return res
    .status(200)
    .json({ code: 200, message: "Received requests fetched", requests });
};

const getAllRequest = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const offset = (page - 1) * limit;
  const { requests, count } = await requestServices.getAllRequest({
    offset,
    limit,
  });
  const totalPages = Math.ceil(count / limit);
  return res.status(200).json({
    code: 200,
    message: "All requests fetched",
    requests,
    page,
    totalPages: totalPages === 0 ? 1 : totalPages,
    totalCount: count,
  });
};

const getRequestDetails = async (req, res) => {
  const request = await requestServices.getById(req.params.id);

  return res
    .status(200)
    .json({ code: 200, message: "A request fetched", request });
};

const commenting = async (req, res) => {
  const body = {
    message: req.body.comment,
    requestId: req.params.id,
    commenterId: req.user.id,
  };
  const comment = await requestServices.addComment(body);

  return res.status(201).json({ code: 201, message: "Comment added", comment });
};

export default {
  sendRequest,
  getUserRequest,
  getReceiverRequest,
  getRequestDetails,
  commenting,
  getAllRequest,
};
