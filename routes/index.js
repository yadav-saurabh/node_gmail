const express = require("express");
const gmail = require("./gmail");

const router = express.Router();

router.use("/gmail", gmail);

module.exports = router;
