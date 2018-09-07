// require('tesseract-lambda');
const request = require('request')
const path = require('path');
const rp = require('request-promise-native')
const fs = require('fs-extra');
const uuidv4 = require('uuid/v4');

const tesseractjs = require('tesseract.js');

const Tesseract = tesseractjs.create({
  workerPath: path.join(__dirname, 'tesseract/src/node/worker.js'),
  corePath: path.join(__dirname, 'tesseract/src/index.js')
})

module.exports.handler = (event, context, callback) => {
  try {
    let imageURL = extractImageURL(event);

    if (imageURL !== null) {
      ocrImage(imageURL, callback);
    } else {
      throw new Error(`imageURL ${imageURL} was null! No image to decipher!`);
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
};

function extractImageURL(event) {
  const IMAGE_URL_QUERY_PARAM_NAME = 'image_url';
  const queryStringParamsObj = event.queryStringParameters;

  if (queryStringParamsObj !== null) {
    if (queryStringParamsObj[IMAGE_URL_QUERY_PARAM_NAME] !== null) {
      return queryStringParamsObj[IMAGE_URL_QUERY_PARAM_NAME];
    }
  }
  return null;
}

function constructPathToCachedImage() {
  const TEMP_DIR = '/tmp';
  const random = uuidv4();
  const filename = TEMP_DIR + '/' + random + '.png';

  return filename;
}

function ocrImage(imageURL, callback) {
  // It is okay for the request promise to share a common local variable here
  // because it is guaranteed that every lambda function is executed
  let pathToCachedImage = null;

  rp(imageURL, { encoding: null })
  .then((data) => {
    pathToCachedImage = constructPathToCachedImage();
    console.log(`[fs.writeFile] pathToCachedImage: ${pathToCachedImage}`);

    return(fs.writeFile(pathToCachedImage, data));
  })
  .then(() => {
    console.log(`[Tesseract Recognize] pathToCachedImage: ${pathToCachedImage}`);

    return Tesseract.recognize(
      pathToCachedImage,
      { lang: 'eng' }
      // { lang: path.join(__dirname, 'tesseract/lang/') }
    );
  })
  .then((result) => {
    Tesseract.terminate();
    console.log(`[Tesseract Recognize Finish] result.text: ${result.text}`);

    callback(null, { text: result.text });
  })
  .catch(error => {
    console.log(`ERROR requesting ${imageURL}: ${JSON.stringify(error)}`);

    callback(error);
  });
}
