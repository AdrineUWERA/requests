const checkPermission = (role) => (req, res, next) => {
  if (Array.isArray(role)) {
    if (role.includes(req.user.role)) {
      return next();
    }
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  }
  if (req.user.role === role) {
    return next();
  }
  return res.status(401).json({ code: 401, message: "Unauthorized" });
};

export default checkPermission;
