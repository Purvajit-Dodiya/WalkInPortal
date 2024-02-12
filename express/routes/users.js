const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(
    "here req:////////////////////////////////////////////////////////////////////////////////////////// ",
    req
  );
  res.send("user list");
});

router.get("/new", (req, res) => {
  res.send("specific user");
});

module.exports = router;
