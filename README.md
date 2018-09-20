# Tesseract OCR Service
An AWS Lambda function that performs OCR on an image hosted at a specified URL
<br/>

## Deploying & Testing
A menu of options is provided with
```
npm run start
```
This allows you to deploy the service to AWS Lambda or run it locally.
<br/>

## API

#### GET `/ocr`
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

## Billing Estimation on AWS Lambda

### FREE

```
No. of free tier seconds / month             = 266,667
Duration of a single OCR function invocation = 6.0s (estimated)
No. of free function invocations / month     = 40,000 - 45,000
```

### PRICE THEREAFTER
```
Price per 0.1 seconds                = $0.000002501
Price per 1 second                   = $0.00002501
Price per function invocation        = $0.00002501 * 6.0s = $0.00015006
Price per 1000  function invocations = $0.15
Price per 10000 function invocations = $1.50
```

