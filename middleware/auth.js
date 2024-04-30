module.exports = () => {
  const user = require("../models/user");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");

  return async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    assert(token, 401, "请提供token");
    const { id } = jwt.verify(token, req.app.get("secret"));
    assert(id, 401, "无效的token");
    req.user = await user.findById(id);
    assert(req.user, 401, "请先登录");
    await next();
  };
};
