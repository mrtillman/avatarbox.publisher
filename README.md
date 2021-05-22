# avatarbox.publisher

hourly update routine for [avatarbox.io](https://avatarbox.io)

---

## Description

**avatarbox.publisher** is a Lambda function that identifies all avatar icons in the [Ready State](https://github.com/mrtillman/avatarbox.sdk/wiki/Glossary#ready-state), and then notifies [avatarbox.worker](https://github.com/mrtillman/avatarbox.worker) via SQS. An EventBridge rule triggers this function once per hour.

## Checklist
1. Same SQS URL from [avatarbox.sdk](https://github.com/mrtillman/avatarbox.sdk)
2. AWS Lambda function named `avbx-publisher`
    - set Timeout to 30 seconds
    - assign the `AvbxPublisherRole` which includes the following IAM policies:
      - `AmazonSQSFullAccess`
      - `AmazonDynamoDBFullAccess`
      - `CloudWatchFullAccess`
      - `AWSLambdaBasicExecutionRole`

3. Lambda environment variables:

    ```sh
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

Upload `avbx-publisher.zip` to S3, and retain the S3 URI so you can define the `avbx-publisher` Lambda function.

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

## License

[MIT](https://github.com/mrtillman/avatarbox.publisher/blob/main/LICENSE)