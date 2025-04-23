const crypto = require("crypto");

function generateTurnCredentials(secret, realm, ttlSeconds = 3600) {
  // Username = current time + ttl (in seconds)
  const timestamp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const username = timestamp.toString();

  // HMAC-SHA1(password = HMAC(username, secret))
  const hmac = crypto.createHmac("sha1", secret);
  hmac.update(`${username}`);
  const password = hmac.digest("base64");

  return {
    username,
    password,
    ttl: ttlSeconds,
    urls: [
      {
        urls: "turn:localhost:3478", 
        username,
        credential: password
      }
    ]
  };
}

module.exports = generateTurnCredentials;
