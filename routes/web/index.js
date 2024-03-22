module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const menu = require("../../models/menu");
  const setting = require("../../models/setting");
  const banner = require("../../models/banner");
  const artical = require("../../models/artical");

  // 前端菜单
  router.post("/menuList", async (req, res) => {
    const items = await menu
      .find({ isFront: true, parent: "前端菜单" })
      .limit(100);
    res.send(items);
  });

  // 基础设置
  router.get("/baseSetting", async (req, res) => {
    const items = await setting.find({}).sort({ _id: -1 }).limit(1);
    res.send(items.length ? items[0] : {});
  });

  // banner图列表
  router.get("/bannerList", async (req, res) => {
    const items = await banner.find().limit(100);
    res.send(items);
  });

  // 文章详情
  router.post("/articalInfo", async (req, res) => {
    const detail = await artical.findOne({ code: { $eq: req.body.code } });
    res.send(detail);
  });

  app.use("/web/api", router);

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      status: err.statusCode || 500,
      message: err.message,
    });
  });
};
