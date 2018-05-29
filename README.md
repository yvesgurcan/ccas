# Central Cascade Automotive Sales

An online ordering system for custom vehicle orders.

## Development

The application is organized in the following manner:
* [Client](./client)
* [Service API](./api)
* [Supplier APIs](./suppliers)

There are 2 supplier APIs:
* [ACME Autos API](./suppliers/acme)
* [Rainier Transporation Solutions API](./suppliers/rainier)

This application relies on Node version 6.9.1. Install `nvm` and set a specific version of Node:

    $ npm install --global nvm
    $ nvm use 6.9.1

### Client

    $ cd client

Scripts:

* `npm start`: starts the client
* `npm run watch`: starts the client with the `--watch` flag
* `npm run build`: removes preexisting build and builds the client in `/dist` with `webpack`
* `npm run lint`: outputs linter warnings and errors in the terminal

### Service API

    $ cd api

Scripts:

* `npm start`: starts the API
* `npm run debug`: starts the API with the `--inspect` flag
* `npm run watch`: starts the API with `nodemon`
* `npm test`: runs tests with `mocha`
* `npm run lint`: outputs linter warnings and errors in the terminal

### Supplier APIs

#### ACME Autos

    $ cd suppliers/acme

Scripts:

* `npm start`: starts the API
* `npm run debug`: starts the API with the `--inspect` flag
* `npm run watch`: starts the API with `nodemon`

#### Rainier Transportation Solutions

    $ cd suppliers/rainier

Scripts:

* `npm start`: starts the API
* `npm run debug`: starts the API with the `--inspect` flag
* `npm run watch`: starts the API with `nodemon`