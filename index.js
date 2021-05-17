const express = require('express');
const cors = require('cors');

require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;
const MongoUtil = require('./MongoUtil');
// const ObjectId = require('mongodb').ObjectId;

const app = express();

app.use(express.json());
app.use(cors());

(async () => {
  const db = await MongoUtil.connect(mongoUrl, 'carecosts-sg');

  app.get('/', async (req, res) => {
    let result = await db.collection('baskets').find({}).toArray();
    res.status(200);
    res.send(result);
  });
})();

app.listen(process.env.PORT || 7000, () => console.log('Server is running'));
