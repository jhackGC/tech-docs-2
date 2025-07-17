# plug ins

## finch

https://github.com/fernando-mc/serverless-finch

Help with deploying static sites front ends to AWS

    npm install --save-dev serverless-finch

bucket config

serverless.yml

        service: finch-test
        # app and org for use with dashboard.serverless.com
        app: finch-test
        org: jhack

        provider:
            name: aws
            runtime: nodejs12.x
            profile: javierhack-sls-admin
            region: us-east-1
