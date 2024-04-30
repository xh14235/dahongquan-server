module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const menu = require("../../models/menu");
  const user = require("../../models/user");
  const articalCategory = require("../../models/articalCategory");
  const artical = require("../../models/artical");
  const setting = require("../../models/setting");
  const banner = require("../../models/banner");
  const message = require("../../models/message");

  const assert = require("http-assert");
  const jwt = require("jsonwebtoken");

  // 登录授权中间件
  const authMiddleware = require("../../middleware/auth");

  // 菜单
  router.post("/addMenu", authMiddleware(), async (req, res) => {
    const model = await menu.create(req.body);
    res.send(model);
  });
  router.get("/menuList", authMiddleware(), async (req, res) => {
    const items = await menu.find().limit(100);
    res.send(items);
  });
  router.get("/menuInfo", authMiddleware(), async (req, res) => {
    const detail = await menu.findById(req.query.id);
    res.send(detail);
  });
  router.put("/editMenu", authMiddleware(), async (req, res) => {
    const model = await menu.findByIdAndUpdate(req.body._id, req.body);
    res.send(model);
  });
  router.delete("/deleteMenu", authMiddleware(), async (req, res) => {
    await menu.findByIdAndDelete(req.query.id);
    res.send({ success: true });
  });
  // 父级菜单列表
  router.get("/parentMenuList", authMiddleware(), async (req, res) => {
    const items = await menu.find({ parent: { $eq: "" } }).limit(100);
    res.send(items);
  });

  // 用户名
  router.post("/addUser", authMiddleware(), async (req, res) => {
    const model = await user.create(req.body);
    res.send(model);
  });
  router.get("/userList", authMiddleware(), async (req, res) => {
    const items = await user.find().limit(10);
    res.send(items);
  });
  router.get("/userInfo", authMiddleware(), async (req, res) => {
    const detail = await user.findById(req.query.id);
    res.send(detail);
  });
  router.put("/editUser", authMiddleware(), async (req, res) => {
    const model = await user.findByIdAndUpdate(req.body._id, req.body);
    res.send(model);
  });
  router.delete("/deleteUser", authMiddleware(), async (req, res) => {
    await user.findByIdAndDelete(req.query.id);
    res.send({ success: true });
  });
  // 登录接口
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const userInfo = await user.findOne({ username }).select("+password");
    assert(userInfo, 444, "没有找到用户");

    const isValid = require("bcrypt").compareSync(password, userInfo.password);
    assert(isValid, 444, "密码错误");

    const token = jwt.sign({ id: userInfo._id }, app.get("secret"));
    res.send({ token, username });
  });

  // 文章分类
  router.post("/addCategory", authMiddleware(), async (req, res) => {
    const model = await articalCategory.create(req.body);
    res.send(model);
  });
  router.get("/categoryList", authMiddleware(), async (req, res) => {
    const items = await articalCategory.find().limit(100);
    res.send(items);
  });
  router.get("/categoryInfo", authMiddleware(), async (req, res) => {
    const detail = await articalCategory.findById(req.query.id);
    res.send(detail);
  });
  router.put("/editCategory", authMiddleware(), async (req, res) => {
    const model = await articalCategory.findByIdAndUpdate(
      req.body._id,
      req.body
    );
    res.send(model);
  });
  router.delete("/deleteCategory", authMiddleware(), async (req, res) => {
    await articalCategory.findByIdAndDelete(req.query.id);
    res.send({ success: true });
  });

  // 文章
  router.post("/addArtical", authMiddleware(), async (req, res) => {
    const model = await artical.create(req.body);
    res.send(model);
  });
  router.post("/articalList", authMiddleware(), async (req, res) => {
    const { category, pageNo, pageSize } = req.body;
    treuCategory = category ? { category: { $eq: category } } : null;
    truePageNo = pageNo || 1;
    truePageSize = pageSize || 10;
    const total = await artical.find(treuCategory).count();
    const datas = await artical
      .find(treuCategory)
      .skip((truePageNo - 1) * truePageSize)
      .limit(truePageSize);
    res.send({
      datas: datas || [],
      pageNo: truePageNo,
      pageSize: truePageSize,
      total: total || 0,
    });
  });
  router.get("/articalInfo", authMiddleware(), async (req, res) => {
    const detail = await artical.findById(req.query.id);
    res.send(detail);
  });
  router.put("/editArtical", authMiddleware(), async (req, res) => {
    const model = await artical.findByIdAndUpdate(req.body._id, req.body);
    res.send(model);
  });
  router.delete("/deleteArtical", authMiddleware(), async (req, res) => {
    await artical.findByIdAndDelete(req.query.id);
    res.send({ success: true });
  });

  // banner图
  router.post("/addBanner", authMiddleware(), async (req, res) => {
    const model = await banner.create(req.body);
    res.send(model);
  });
  router.get("/bannerList", authMiddleware(), async (req, res) => {
    const items = await banner.find().limit(100);
    res.send(items);
  });
  router.get("/bannerInfo", authMiddleware(), async (req, res) => {
    const detail = await banner.findById(req.query.id);
    res.send(detail);
  });
  router.put("/editBanner", authMiddleware(), async (req, res) => {
    const model = await banner.findByIdAndUpdate(req.body._id, req.body);
    res.send(model);
  });
  router.delete("/deleteBanner", authMiddleware(), async (req, res) => {
    await banner.findByIdAndDelete(req.query.id);
    res.send({ success: true });
  });

  // 基础设置
  router.get("/baseSetting", async (req, res) => {
    const items = await setting.find({}).sort({ _id: -1 }).limit(1);
    res.send(items.length ? items[0] : {});
  });
  router.post("/editSetting", authMiddleware(), async (req, res) => {
    const model = await setting.create(req.body);
    res.send(model);
  });

  // 留言
  router.post("/messageList", authMiddleware(), async (req, res) => {
    const { kewword, pageNo, pageSize } = req.body;
    treuKeyword = kewword ? { kewword: { $eq: kewword } } : null;
    truePageNo = pageNo || 1;
    truePageSize = pageSize || 10;
    const total = await message.find(treuKeyword).count();
    const datas = await message
      .find(treuKeyword)
      .skip((truePageNo - 1) * truePageSize)
      .limit(truePageSize);
    res.send({
      datas: datas || [],
      pageNo: truePageNo,
      pageSize: truePageSize,
      total: total || 0,
    });
  });
  router.get("/messageInfo", authMiddleware(), async (req, res) => {
    const detail = await message.findById(req.query.id);
    res.send(detail);
  });
  router.delete("/deleteMessage", authMiddleware(), async (req, res) => {
    await message.findByIdAndDelete(req.query.id);
    res.send({ success: true });
  });

  app.use("/admin/api", router);

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      status: err.statusCode || 500,
      message: err.message,
    });
  });

  // 图片上传
  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post(
    "/admin/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = file.filename;
      file.location = file.filename;
      res.send(file);
    }
  );
};
