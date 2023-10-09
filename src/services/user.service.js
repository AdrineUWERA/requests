import User from "../database/models/user.model";

async function createUser(details) {
  const user = await User.create(details);
  return user;
}

async function getUserById(id) {
  const user = await User.findByPk(id);
  return user;
}
async function enableTFA(id) {
  const findData = await User.findByPk(id);
  findData.tfa_enabled = true;
  await findData.save();
}

async function disableTFA(id) {
  const findData = await User.findByPk(id);
  findData.tfa_enabled = false;
  await findData.save();
}

async function updateUser(updates, id) {
  await User.update(updates, { where: { id: id } });
  const updatedUser = await User.findByPk(id);
  return updatedUser;
}

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

export default {
  createUser,
  getUserById,
  enableTFA,
  disableTFA,
  updateUser,
  getUserByEmail,
};
