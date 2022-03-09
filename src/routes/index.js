/* import express from 'express';

const router = express.Router();


router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

export default router; */
import express from 'express';
import userRoute from './userRoute';
import socialUserRoute from './socialUserRoute';
import postSocialRoute from './postSocialRoute';

const router = express.Router();

userRoute(router);
socialUserRoute(router);
postSocialRoute(router);

export default router;
