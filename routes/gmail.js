const express = require("express");
const { authorize, storeToken } = require("../middleware/gmail");

const { listMessages, getMessage } = require("../controller/gmail");

const router = express.Router();

router.get("/mails", authorize, listMessages);

router.get("/mail/:id", authorize, getMessage);

router.get("/auth/callback", storeToken);

module.exports = router;
