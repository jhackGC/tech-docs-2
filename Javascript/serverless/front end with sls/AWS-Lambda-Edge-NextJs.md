# create app

    npx create-next-app

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# install sls compoent for next-js

    npm i serverless-next.js -D

## creaet next.config file

        module.exports = {
            target: "serverless",
        };

create env file

        AWS_ACCESS_KEY_ID=
        AWS_SECRET_ACCESS_KEY=

create sls file

    nextApp:
      component: "serverless-next.js"

run sls

    npx serverless

# Resurces creation

it creates

- S3 bucket
- Cloudfront distribution
- SSL ?
- Lambda for SSR, render pages t
