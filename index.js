const express = require("express");
const app = express();

// khi client truy cap den duong dan tinh cua wweb thi se chay folder nay
app.use(express.static("public"));

// su dung view engine la .ejs
app.set("view engine", "ejs");

// cac file view engine se dc chua tai folder ./views
app.set("views", "./views");

// tao 1 server bang phuong thuc http
const server = require("http").Server(app);

// cho phep socket.io chay cung 1 cong ip vs doi tuong server
const io = require("socket.io")(server);

// server lang nghe nhung req cua client
server.listen(3000);

io.on("connection", (socket) => {
  console.log("ket noi thanh cong", socket.id);

  socket.on("disconnect", () => {
    console.log("may chu mat ket noi vs client:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("trangchu");
});
