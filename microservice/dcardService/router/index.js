const express = require('express');
const router = express.Router();

router.get('/test', function (req, res) {
  console.log(JSON.stringify(req.headers))
  res.send('Hello World!');
});

module.exports = router;