## Configure your aws login

https://serverless.com/framework/docs/providers/aws/guide/credentials/

The sls framework user will have to:

- Create an S3 bucket for your function deployments
- Upload your function zip files to that S3 bucket
- Submit a CloudFormation template
- Create the log groups for your Lambda functions
- Create a REST API in API Gateway
- Create a DynamoDB table

* So, create a user in IAM with permissions:
  https://serverless.com/blog/abcs-of-iam-permissions/

  (this list can be narrowed down)

  - LambdaFullAccess
  - AWSCloudFormationFullAccess
  - AmazonAPIGatewayAdministrator
  - IAMFullAccess
  - s3 missing !!!!!

* Set a profile to deploy, using the newly user created keys
  careful do not use uppercase for keys in credentials .e.g. use aws_access_key_id instead of AWS_ACCESS_KEY_ID

        $ vim ~/.aws/credentials
