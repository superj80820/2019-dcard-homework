import * as dotenv from "dotenv";
dotenv.config();
import * as express from 'express';
import { router } from "./router";

const app: express.Application = express();

app.use('/dcard', router)

app.listen(3000, ()=> {
  console.log('app listening on port 3000!');
});