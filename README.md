## About

`create-react-app` typescript template powered by `husky` and `lint-staged`.
Every time you commit new changes `husky` runs `lint-staged` which configured to run ESLint and Prettier. This way you don't have to worry about code-styling.

## Extend `eslint`

If you need other `eslint` configs or plugins, you can easily add those with `npm` or `yarn` and edit `.eslintrc.json` file. <br />
Read more about [CRA: Extending the ESLint config](https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config).

## Absolute imports
Edit [tsconfig.json](./tsconfig.json) `paths` property to add more absolute import paths:
```json
  "paths": {
    "@components/*": ["src/components/*"],
    "@hooks/*": ["src/hooks/*"]
  }
```

## TravisCI
See [example.travis.yml](./example.travis.yml) for some examples.

## Future plans
- [ ] CSS styling guide (styled, emotion, css modules)


## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

### `yarn test` or `npm test`

Launches the test runner in the interactive watch mode.<br />
### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.