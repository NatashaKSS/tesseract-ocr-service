import { ocr } from '../controllers/api/ocr';

const setupBaseApiRoute = (app, router) => {
  app.use('/api', router);
};

const setupRoutes = (app, router) => {
  router.route('/ocr').get(ocr);
};

export default (app, router) => {
  setupBaseApiRoute(app, router);
  setupRoutes(app, router);
  
  return router;
};