# Central Cascade Automotive Sales

CCAS online ordering system for custom vehicle orders.

## Structure

The application is organized in the following manner:
* [Client](./client) (localhost:8080)
* [Service API](./api) (localhost:3000)
* Supplier APIs
    * [ACME Autos API](./suppliers/acme) (localhost:3050)
    * [Rainier Transporation Solutions API](./suppliers/rainier) (localhost:3051)

## Install Node 6.9.1

This application relies on Node version 6.9.1.

To set up your CLI to the right Node environment, you can install `nvm`. Follow the instructions [here](https://github.com/creationix/nvm).

Then, you can run the following commands:

  $ nvm install 6.9.1
  $ nvm use 6.9.1

## Configure environment

If necessary, you can change where the APIs are served by changing the values in each `.env` file.

## Set up database

If you haven't installed MongoDB yet, you can do so by following the instructions [here](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-os-x/) and then run `mongod`.

## Scripts

* `npm run install`: install packages for the whole application
* `npm run start`: starts the whole application
* `npm run watch`: starts the whole application in watch mode
* `npm run test`: runs tests for the whole application

You can run these scripts individually by adding `:client`, `:api`, `:acme`, or `:rainier` to the script name.

For example: `npm run watch:api` will start `nodemon` for the service API.
