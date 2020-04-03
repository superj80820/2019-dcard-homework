require('dotenv').config()
const users = require('../model/users')
const express = require('express');
const router = express.Router();

router.get('/random', async function (req, res) {
  const [queryUserByRandomResult, queryUserByRandomError] = await users.queryUserByRandom()
  if (queryUserByRandomError) {
    // TODO: error handling
  }
  res.json(queryUserByRandomResult.rows);
});

module.exports = router;