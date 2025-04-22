const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mediasoup = require("mediasoup");
const cors = require("cors");
const { mediaCodecs } = require("./mediasoup-config");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3001", // React app port
    methods: ["GET", "POST"]
  }
});

app.use(cors());


let worker;
let router;

const PORT = 3000;

async function startMediasoup() {
  worker = await mediasoup.createWorker();
  router = await worker.createRouter({ mediaCodecs });

  console.log(" Mediasoup worker and router created");
}

io.on("connection", (socket) => {
  console.log(" User connected:", socket.id);

  socket.on("getRtpCapabilities", (callback) => {
    callback(router.rtpCapabilities);
  });
});

server.listen(PORT, async () => {
  await startMediasoup();
  console.log(` Server listening on http://localhost:${PORT}`);
});
