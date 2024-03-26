- socket.io se tao ra tung socket de quan ly su ket noi cua tung client den server

- socket.io chạy bằng cách ở server sẽ lắng nghe sự kiện kết nối đến server từ client, còn từ client khi kết nối sẽ tạo một io để kết nối đến socket

- trong socket, từ phía gửi nội dung lên sẽ dùng 'socket.emit', còn phía lắng nghe nội dung sẽ dùng 'socket.on'

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

**CLIENT**

```
$(document).ready(() => {
        $("#btn-clickMe").click(() => {
          socket.emit("Client-send-data", "Vy dep trai");
        });
      });
```

**SERVER**

```
io.on("connection", (socket) => {
  console.log("ket noi thanh cong", socket.id);


  socket.on("Client-send-data", (d) => {
    console.log(d);
  });
});
```

# Những trường hợp server trả data về cho client (emit)

## server gửi về cho toàn bộ client ở mọi socket khác nhau (bao gồm cả người gửi)

```
io.sockets.emit
```

## server chỉ gửi về cho thằng gửi

```
socket.emit
```

## server gửi về cho những thằng khác (trừ client)

```
socket.broadcast.emit
```

## client nhắn riêng với nhau

```
io.to("socketID").emit("content)
```

**CLIENT**

```
let socket = io("127.0.0.1:3000/");

    // client đang lắng nghe data từ server gửi xuống, với nội dung sẽ là biến dataS
      socket.on("Server-send-data", (dataS) => {
        $("#content").append(dataS);
      });

      $(document).ready(() => {
        $("#btn-clickMe").click(() => {

        //client gửi content về server, với "Client-send-data" sẽ là hành động gửi cho server, "Vy dep trai" sẽ là content gửi lên server
          socket.emit("Client-send-data", "Vy dep trai");
        });
      });
```

**SERVER**

```
// server lắng nghe sự kiện mà client gửi lên, với "Client-send-data" là tên hành động mà client gửi, nội dung mà client gửi sẽ là tham số 'd'

socket.on("Client-send-data", (d) => {
    console.log(d);

    // các cách mà server gửi lại content cho các client khác, nội dung của từng dòng đã note ở trên

    io.sockets.emit("Server-send-data", d + " global");
    socket.emit("Server-send-data", d + " just client send");
    socket.broadcast.emit("Server-send-data", d + " all ngoài client");

  });
```

- Mỗi lần tắt trình duyệt nhưng vẫn muốn
