# Setup a Node Server in AWS with basic tools (not ElasticBeanstalk)

# resources

https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-1-d67367ac5171

# Create the instance, free tier, and the SSH keys to access it

# connect with SSH

Once the .pem file is in your ssh folder, use chmod to set permissions so that it can be used as a key.
$ cd ~/.ssh/
$ chmod 400 ~/.ssh/whatever-your-key-name-is.pem

To SSH we need to have a username, an address and a key.
The address is available when we click on our instance in the EC2 instances dashboard.
PUBLIC IP i.e: 52.67.181.241

connect, giving the .pem file as a key using the -i flag.

Don't actually run this command

\$ ssh -i ~/.ssh/whatever-your-key-name-is.pem 52.214.64.3

ssh -i ~/.ssh/aws-breeze-server.pem 52.67.181.241

or
with public DNS

ssh -i ~/.ssh/aws-breeze-server.pem ec2-52-67-181-241.sa-east-1.compute.amazonaws.com

Almost there. By default, connecting to your instance without a username will try to login as root which is generally not allowed. By right clicking your instance and selecting connect we can see what the correct username is. This is dependant on the image you chose, for ubuntu the username is by default ubuntu. You can see the username in the Example section of the dialogue, it is the part before the @ symbol.

To access your instance:
Open an SSH client. (find out how to connect using PuTTY)

Locate your private key file (aws-breeze-server.pem). The wizard automatically detects the key you used to launch the instance.

Your key must not be publicly viewable for SSH to work. Use this command if needed:
chmod 400 aws-breeze-server.pem
Connect to your instance using its Public DNS:
ec2-52-67-181-241.sa-east-1.compute.amazonaws.com

Example:
ssh -i "aws-breeze-server.pem" ec2-user@ec2-52-67-181-241.sa-east-1.compute.amazonaws.com

Please note that in most cases the username above will be correct, however please ensure that you read your AMI usage instructions to ensure that the AMI owner has not changed the default AMI username.

TRY:

    ssh -i "aws-breeze-server.pem" ec2-user@ec2-52-67-181-241.sa-east-1.compute.amazonaws.com

# Install Node

## Install NVM to manage versions

To install NVM just run this command (same as in the NVM installation instructions).

\$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash

and check the bash file, the bash file has been updated probably by the installation of nvm, refresh the bash in the current session so you dont have to logout and login again ...

## Install Node

\$ nvm install 12.9.1

## Quick app creation

Create a node app with express and make it run in port 3000.

$ mkdir server
$ cd server
$ npm init (all default)
$ npm install express --save-dev
\$ nano index.js

        const express = require('express')
        const app = express()
        app.get('/', (req, res) => {
        res.send('HEY!')
        })
        app.listen(3000, () => console.log('Server running on port 3000'))

\$ node index.js

Once listening, this should log “Server running on port 3000”. You may have noticed however we didn’t open our server traffic to port 3000, we opened it to port 80. Port 80 is a privileged port and running the server there using Node.js is unusual, generally using a router is better. If you change the index.js file to use 80 and then run node index.js you will notice you get a permission denied error.

In the next tutorial we will go through adding a router to use port 80, but for now let’s just open up port 3000 so we can test our server.

## Use GIT to manage your app

### Install GIT

- Install git in your EC2 instance
  \$ sudo yum install git -y

- Check git version
  \$ git version

- Clone your repo
  \$ git clone <YOUR REPO URL>

- run the app in the server

#

# Allow the instance to receive inbound connections to :3000

Leave your server running and go to the Security Groups tab in the EC2 console. Right click the security group you setup and click edit inbound rules. Click Add Rule. This time we are going to use a custom TCP rule on port 3000, open to anywhere.

Type: Custom TCP Rule
Protocol: TCP
port range: 3000
Source: Anywhere IPS: 0.0.0.0/0, ::/0

You should now have access to our server! Using a browser, visit your public DNS URL with port 3000 and you should see the HEY! response.

e.g. ec2-52-67-181-241.sa-east-1.compute.amazonaws.com:3000

# Leave the server running

## using the "bg" commands

To leave the server running when we log out, we need to press ctrl+z to pause the process (this only works when your server is running, node index.js). When you press ctrl+z you will be presented with all jobs, in this case the only one there will be the Node.js job that was paused.

You can see that the job number for node index.js is 1 (as noted by [1]+). To run that in the background, use the bg command.

        $ bg %1

If everything went well we should have a simple Node.js app which is accessible from a public URL anywhere in the world!

To stop the instance just navigate to the Instances tab in the EC2 dashboard, right click on your instance and in Instance State click Stop.

In the next tutorial I intend to cover

running the app on port 80 using nginx
using PM2 to keep the app running after a restart
using PM2 to deploy the app from a local directory
Let me know in the comments section if there is anything I missed or is a bit confusing!

# Serving HTTP traffic on the standard port, 80

If you have just an API maybe you can just leave it serving in port 300 and if it's not a public api, restricting the incoming connections to just a client in particular (i.e. React app server IP)

Paste this URL into a URL bar in a new tab.

http://imgur.com:80/
You will notice the 80 gets dropped in the URL bar. That’s because port 80 is the default port for HTTP traffic.

HTTPS traffic uses port 443. Try Hacker News.

https://news.ycombinator.com:443/
Because these ports are often public, you need special privileges to run processes using them. Also, it is not great to run Node.js on port 80 or 443 directly because you may want to open up a few different applications on these ports. With a router you will be able to send traffic from port 80 or 443 to any program you wish, depending on the headers of the incoming HTTP request.

There are few great choices for a router, but I find that nginx is generally the best tool for most things. It’s great for building your first ever app, or when you need to scale up to millions of visitors.

Before beginning, start your server if it is stopped and SSH into it (as shown in the last tutorial). Once logged in, we can install nginx.

Ubuntu comes with it’s own package manager, apt-get. Using apt-get, we can install nginx in one command.

\$ sudo apt-get install nginx

or in CentOS or Amazon Linux AMI

\$ sudo yum install nginx

runs nginx automatically after install so you should now have it running on port 80, check by entering your public DNS URL into a browser.

i.e. ec2-52-67-181-241.sa-east-1.compute.amazonaws.com

If this doesn’t work, you might need to start it manually.

sudo /etc/init.d/nginx start

# Configure nginx

We need to configure nginx to route port 80 traffic to port 3000. nginx has config placed in the /etc/nginx/sites-available folder where there is already a default config which serves the nginx welcome page we saw earlier.

You can take a look at this config using cat.

    cat /etc/nginx/sites-available/default

How are nginx configs set up? Configs are stored in plain text files in sites-available with any name. Linking them into the sites-enabled folder will cause them to be read and used when nginx starts. All of the configs are combined together by nginx.
