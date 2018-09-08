import express from 'express';
import bindBodyParser from './bindBodyParser';
import bindRouter from './router';

let setupMiddleware = (app) => {
  bindBodyParser(app);
  bindRouter(app, express.Router());
}

let spinServer = (app, port) => {
  app.listen(port, () => {
    console.log(`Running on port ${port}...`);
  });
};

export default () => {
  const app = express();
  app.set('port', (process.env.PORT || 5100));

  setupMiddleware(app);
  spinServer(app, app.get('port'));
};
