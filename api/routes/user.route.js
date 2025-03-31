import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  //req: data that we send to the server
  //res: data that we get from the server
  res.json({message: 'API is working'});
}
);

export default router;