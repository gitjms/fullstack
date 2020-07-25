# GraphQL Library

## Available Scripts

In the project directory **library-backend**, run:

### `npm run dev`

Runs the app in the development mode and the page will reload if you make edits.<br />

or

### `npm run start`

Runs the app in the production mode.<br />

In the project directory **library-frontend**, run:

### `npm start`

Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

### `build:ui`, `deploy`, `deploy:full`, `logs:prod`

## App in Heroku

A makeshift version of the app is in Heroku:

### [graphql-library-jms](https://graphql-library-jms.herokuapp.com/)

It kinda works but not really:

Notifications don't work and you'll get these errors in the console:

`WebSocket connection to 'ws:<URL>/graphql' failed: WebSocket is closed before the connection is established`

`WebSocket connection to 'ws://localhost:4000/graphql' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED`

Otherwise the app works. You can:

* list authors and books
* list books by to genre
* sign in and out, and create an account
* get recommendations according to your favorite genre
* modify author's birthyear
* add books

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
