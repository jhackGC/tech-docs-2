# GLOBALLY DISTRIBUTED
## Route 53
DNS service and helpful to manage requests

Lambdas are defined PER REGION

** So if you put one in each region, you use Route 53 to determine which Lambda to route to, depending on where the client is making that call from**

Its like a "Lambda CDN" built on Route 53.


## AWS Lambda@Edge
CDN of Lambdas, computation on the CDN node, super fast APIs.

## Cloudfare Workers
an option to AWS @Edge   

