require("dotenv").config();

const express = require("express");
const generateTurnCredentials = require("./turnCredentials");

const app = express();
const PORT = 4000;

const COTURN_SECRET = process.env.COTURN_SECRET;
const COTURN_REALM = process.env.COTURN_REALM;

app.get("/turn-credentials", (req, res) => {
  const credentials = generateTurnCredentials(COTURN_SECRET, COTURN_REALM);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(credentials, null, 2)); 

});

app.listen(PORT, () => {
  console.log(`TURN credential server running on http://localhost:${PORT}`);
});
