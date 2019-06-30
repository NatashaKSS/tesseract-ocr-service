# Tesseract OCR Service
An AWS Lambda function that performs OCR on an image hosted at a specified URL

This project was made to experiment with self-hosting `Tesseract.js` to perform OCR on a serverless platform like AWS Lambda. It turned out to be a great way to learn about AWS Lambda & the Serverless Framework, so here's my code, have at it.

<br/>

## Getting Started

**Install required dependencies**
```
npm install
```

**Spin up the server**

A menu of options is provided with
```
npm run start
```

Spin up a Serverless instance on your localhost (port `3000` by default) with the command 

```
npm run start-offline
```

## API

#### GET `/ocr`
**Param:** `image_url`

Performs OCR of the image hosted at `image_url` and returns all of the textual information Tesseract can find.

**Example GET request**
```
http://localhost:3000/ocr?image_url=https://zdnet3.cbsistatic.com/hub/i/r/2017/12/12/67b1a674-c8a8-415a-b57b-7e5961fee2cc/resize/770xauto/c6c18e77cbc0b9f74d4ed1dd6c7d4cb4/screen-shot-2017-12-11-at-11-13-50-pm.png
```

**Returns**
```
{
    statusCode: 200,
    body: {
        result: "' Netflix us 0 v\\n©netih><\\nTo the 53 people who've watched A\\nChristmas Prince every day for the past 18\\ndays: Who hurt you?\\n9:52 PM 710 Dec 2017\\n102,579 Retweets 403,055 kaes ‘qujﬂg Q6; %\\nO 7.2K U, 103K (7 403K 8\\n\\n\"
    }
}
```

## Unit Tests
There aren't any tests right now, but I made a template for your convenience at `./src/test/ocr.test.js`.

**Run tests with**
```
npm run test
```


## Setting up your AWS Lambda Service

I assume you have already created an AWS Lambda Service and configured your local desktop environment (e.g. AWS credentials, CLI) to be able to deploy AWS services. If not, you can check out their official guide [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).

Then, check out Serverless Framework [here](https://serverless.com/framework/docs/providers/aws/guide/intro/). It helps you to automate the deployment of your AWS infrastructure resources & lambda functions, using the `serverless.yml` template.

## Deploying
Deploy the service to AWS Lambda with the help of Serverless

```
npm run deploy-prd
```

Or just deploy a lambda function without having to re-deploy the entire service

```
npm run deploy-func-serve-prd
```

---

## Billing / Performance Estimation on AWS Lambda

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

### MEMORY USAGE
Ranged from `50MB` (images with small resolution) to `700MB` (images with large resolution). I had to provision my lambda service on AWS a pretty large memory capacity (like maybe ~1.5GB) to be able to cope with a wide range of image resolutions.
