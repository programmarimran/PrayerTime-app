const admin = require("firebase-admin");

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
const serviceAccountJson = Buffer.from(serviceAccountBase64, "base64").toString("utf-8");
const serviceAccount = JSON.parse(serviceAccountJson);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

