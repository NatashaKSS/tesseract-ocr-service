# Tesseract OCR Service
An AWS Lambda function that performs OCR on an image hosted at a specified URL
<br/>

# Deploying & Testing
A menu of options is provided with
```
npm run start
```
This allows you to deploy the service to AWS Lambda or run it locally.
<br/>

# API

### GET `/ocr`
**Params:** `image_url`

Performs OCR of the image hosted at `image_url` and returns all of the textual information Tesseract can find.

**Example GET request**
```
http://localhost:3000/ocr?image_url=http://url.to.my.image
```

**Returns**
```
{
    "text": "Some text from the image"
}
```
---
