import express from 'express';
import bodyParser from 'body-parser';
import someFunc from './controllers/someFunc';

let setupMiddleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
}

let spinServer = (app) => {
  const port = app.get('port');
  app.listen(port, () => {
    console.log(`Running on port ${port}...`);
    console.log('Hello', someFunc());
  })
};

export default () => {
  const app = express();
  app.set('port', (process.env.PORT || 5100));

  setupMiddleware(app);
  spinServer(app);
};

