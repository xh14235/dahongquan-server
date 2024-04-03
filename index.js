const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("cors")());
// 托管静态文件
app.use("/uploads", express.static(__dirname + "/uploads"));

app.set("secret", "14235");

// 后台接口
require("./routes/admin")(app);
// 前端接口
require("./routes/web")(app);
require("./plugins/db")(app);

app.listen(3000, () => {
  console.log("serve in port 30000");
});
