# Elastic Beanstalk

## Install ebclient

Upgrade eb client with brew

## Configure Access

In AWS Console

IAM

- create user
  - programmatic access: true
  - elastic beanstalk permissions
    - attach existing policies directly
      - search for beanstalk permissions, and set:
        - AWSElasticBeanstalkFullAccess
  - create user and then you will have theAccess key id and secretaccess key, save them in a file

Your local console

- go to your node server root dir

\$ eb init

    - use the IAM credentials
    - use ssh for your instances
    - use codecommit (if you want)
    - aws-eb key par
        - passphrase: leave it blank

## create environemnts

    eb create (dev/qa/prod)

by default it creates a t2.micro instance

- you may put some env variables like the MONGO URL

## check status

    eb status
