import React, { useEffect } from "react";
import socket from "./socket";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(" Connected to server:", socket.id);

      // Request router RTP capabilities
      socket.emit("getRtpCapabilities", (rtpCapabilities) => {
        console.log(" RTP Capabilities from server:", rtpCapabilities);
      });
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2> Mediasoup MVP Client</h2>
      <p>Open the console to see connection logs.</p>
    </div>
  );
}

export default App;
