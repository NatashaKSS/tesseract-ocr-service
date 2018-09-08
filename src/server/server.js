import express from 'express';
import bindBodyParser from './bindBodyParser';
import someFunc from '../controllers/someFunc';

let setupMiddleware = (app) => {
  bindBodyParser(app);
}

let spinServer = (app, port, funcToRun) => {
  app.listen(port, () => {
    console.log(`Running on port ${port}...`);
    console.log('Hello', funcToRun());
  })
};

export default () => {
  const app = express();
  app.set('port', (process.env.PORT || 5100));

  setupMiddleware(app);
  spinServer(app, app.get('port'), someFunc);
};

