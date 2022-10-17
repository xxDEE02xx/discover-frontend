# DISCOVER (Frontend)

Next.js Typescript project serving as the frontend for the trends modeller product.

Please read the development setup to get started with using this application:
[Development Setup Frontend and Backend](https://synthesis.atlassian.net/wiki/spaces/TM/pages/262162/Development+Setup+Frontend+Backend)

## Setup

Install dependencies:

### `yarn install`

Setup local environment variables:

1. Create a `.env.local` in root directory - [next.js env docs](https://nextjs.org/docs/basic-features/environment-variables)<br />
2. Values can be acquired from other developer (if needed) - synthesis.<br />

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `ANALYZE=true yarn build`

Build and Run/Generate [bundle analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### `yarn lint`

Runs yarn lint checking.

## GIT pre-commit

[HUSKY](https://typicode.github.io/husky/#/)

1. Enable GIT hooks

### `npx husky install`

2. Prepare GIT hooks

### `npm run prepare`

3. Add pre-commit hooks

### `git add .husky/pre-commit`

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build your container: `docker build -t [args] nextjs-docker .`.
3. Run your container: `docker run -p 3000:3000 nextjs-docker`.

NOTE: make sure you added [args] for environment variables - [more](https://www.saltycrane.com/blog/2021/04/buildtime-vs-runtime-environment-variables-nextjs-docker/)

You can view your images created with `docker images`.
