- socket.io se tao ra tung socket de quan ly su ket noi cua tung client den server

- socket.io chạy bằng cách ở server sẽ lắng nghe sự kiện kết nối đến server từ client, còn từ client khi kết nối sẽ tạo một io để kết nối đến socket

```
 const server = require("http").Server(app);
```

- tạo ra một đối tượng server http bằng cách sử dụng đối tượng 'app' của express làm đối số
- Trong Node.js, một server HTTP có thể được tạo ra bằng cách sử dụng module http, điều này cho phép bạn tạo ra một server có thể lắng nghe và xử lý các yêu cầu HTTP từ các máy khách.
- app là một đối tượng Express được tạo ra từ hàm express(), đại diện cho ứng dụng Express của bạn. Bằng cách chuyển đối tượng app này vào http.Server(), bạn có thể tạo ra một server HTTP để lắng nghe các yêu cầu từ trình duyệt web.

```
const io = require("socket.io")(server);
```

- cho phep socket.io chay cung 1 cong ip vs doi tuong server

```
io.on("connection", (socket) => { //io se lang nghe 'on' su kien 'connection', khi ai do 'connect' thi no se tao ra socket tuong ung với từng connect

  console.log("ket noi thanh cong", socket.id);

   socket.on("disconnect", () => { // Khi client mat ket noi,
    console.log("may chu mat ket noi vs client:", socket.id);
  });
});
```

_CLIENT_

```
$(document).ready(() => {
        $("#btn-clickMe").click(() => {
          socket.emit("Client-send-data", "Vy dep trai");
        });
      });
```

_SERVER_

```
io.on("connection", (socket) => {
  console.log("ket noi thanh cong", socket.id);


  socket.on("Client-send-data", (d) => {
    console.log(d);
  });
});
```
