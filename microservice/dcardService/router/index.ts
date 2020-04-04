import * as express from 'express';
import * as users from '../model/users'

const router = express.Router();

router.get('/random', async function (req, res) {
  const [queryUserByRandomResult, queryUserByRandomError] = await users.queryUserByRandom()
  if (queryUserByRandomError) {
    console.error(`users.queryUserByRandom() get error: ${queryUserByRandomError}`)
    res.status(500).json({
      errorMessage: 'DB error'
    })
  }
  res.json(queryUserByRandomResult.rows);
});

export { router }
