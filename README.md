# avatarbox.publisher

hourly update routine for avatarbox.io

---

## Checklist

1. Create an AWS Lambda function named `avbx-publisher`, 
    - set Timeout to 30 seconds
    - assign the `AvbxPublisherRole` which includes the following IAM policies:
      - `AmazonSQSFullAccess`
      - `AmazonDynamoDBFullAccess`
      - `CloudWatchLogsFullAccess`
      - `AWSLambdaSQSQueueExecutionRole`

2. Configure the Lambda environment variables:

    ```sh
    KMS_KEY_ID={YOUR-KMS-KEY-ID}
    REGION=us-east-1
    QUEUE_URL={YOUR-SQS-QUEUE-URL}
    ```

## Installation

```sh
$ git clone https://github.com/mrtillman/avatarbox.publisher.git
$ cd avatarbox.publisher && npm install
```

## Usage

```sh
# zip code + dependencies
$ npm run zip
```

Upload `avbx-publisher.zip` to S3 for use in the `avbx-publisher` Lambda function.

### EventBridge Rule

|Setting|Description|
|---|---|
|Event schedule | Cron expression: `0 * * * ? *`|
|Target | Lambda function: `avbx-publisher`|

### SNS Topic

|Setting|Description|
|---|---|
|Endpoint|Your email address|
|Name| `avatarbox`|
|Protocol|Email|
|Type| Standard|

### CloudWatch Alarm

|Setting|Description|
|---|---|
|FunctionName|avbx-publisher|
|Metric name|Errors|
|Notification Action|When in alarm, send message to topic "avatarbox"|
|Statistic|Sum|
|Threshold|Errors >= 1 for 1 datapoints within 5 minutes|
|Type|Metric|

---

[MIT](https://github.com/mrtillman/avatarbox.publisher/blob/main/LICENSE)