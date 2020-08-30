# <p align="center">JStestProject

* [About project](#about-project)
* [Getting started](#getting-started)
* [Libraries](#libraries)
* [Client](#client)
* [Server](#server)

## About project
The project's task is to show the possibility to create app using Node.js, React, Material UI, PostgreSQL. 
This app gives user the possibility to authorize and get into closed part of the app. 
The app contains five pages: authorisation page, main page, and three pages where information could be changed.

## Getting started
To run this project in the terminal, you need to run:

#### `run dev`

Also you can start the server or the client part separately using the commands:

#### `run server`
#### `run client`

## Libraries
This project was written using the libraries:
* Material-UI (is used to create interface),
* pg (libraries for PostgreSQL),
* express (web framework for Node.js),
* nodemon (for editing of working project),
* bcrypt (for encryption passwords),
* create-react-app (to create interface),
* jsonwebtoken (for using token),
* react-dom (for using routes),
* clsx.


## Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Server

Server was written with Node.js and using database PostgreSQL. When you start the project it will create a table and if 
the table is empty programme adds first client "admin".