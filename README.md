# Getting Started with Create React App
# Blog
using tailwindcss redux toolkit, typescript,
config project, redux RTK
+using tailwindcss redux toolkit, typescript,
+config project, redux RTK

initital
yarn create-react-app projectName --template typescript
yarn add -d prettier eslint-plugin-prettier eslint-config-prettier
+ yarn create-react-app projectName --template typescript
+ yarn add -d prettier eslint-plugin-prettier eslint-config-prettier

  "scripts": {
 + "scripts": {
    ...
    "lint":"eslint --ext ts,tsx src/",
    "lint:fix":"eslint --fix --ext ts,tsx src/",
    "prettier":"prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss\"",
    "prettier:fix":"prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss\""
  }

yarn add tailwindcss postcss autoprefixer
npx tailwindcss init -p
yarn add -D prettier-plugin-tailwindcss
yarn add @reduxjs/toolkit
+ yarn add tailwindcss postcss autoprefixer
+ npx tailwindcss init -p
+ yarn add -D prettier-plugin-tailwindcss
+ yarn add @reduxjs/toolkit

run 
yarn lint
yarn lint:fix 
yarn prettier 
yarn prettier:fix
+ yarn lint
+ yarn lint:fix 
+ yarn prettier 
+ yarn prettier:fix
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
