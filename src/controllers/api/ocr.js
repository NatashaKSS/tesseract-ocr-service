import isEmpty from 'lodash/fp/isEmpty';
import path from 'path';
import rp from 'request-promise-native';
import tesseractjs from 'tesseract.js';

const Tesseract = tesseractjs.create({
  workerPath: path.join(__dirname, '../../lib/tesseract/src/node/worker.js'),
  langPath:   path.join(__dirname, '../../lib/tesseract/lang/'),
  corePath:   path.join(__dirname, '../../lib/tesseract/src/core.js')
});

export const ocr = (req, res) => {
  if (!isEmpty(req.query.image_url)) {
    const imageURL = req.query.image_url;

    rp(imageURL, { encoding: null })
    .then(data => {
      return Tesseract.recognize(data);
    })
    .then((result) => {
      console.log(`[Tesseract Recognize Finish] result.text: ${result.text}`);
      Tesseract.terminate();
    })
    .catch(error => {
      console.log(`ERROR requesting ${imageURL}: ${JSON.stringify(error)}`);
    });
  }
};
