# Central Cascade Automotive Sales

CCAS online ordering system for custom vehicle orders.

## Structure

The application is organized in the following manner:
* [Client](./client)
* [Service API](./api)
* Supplier APIs
    * [ACME Autos API](./suppliers/acme)
    * [Rainier Transporation Solutions API](./suppliers/rainier)

## Install Node 6.9.1

This application relies on Node version 6.9.1.

Install `nvm` and set a specific version of Node:

    $ npm install --global nvm
    $ nvm install 6.9.1
    $ nvm use 6.9.1

## Scripts

* `npm run install`: install packages for the whole application
* `npm run start`: starts the whole application
* `npm run watch`: starts the whole application in watch mode

You can run these scripts individually by adding `:client`, `:api`, `:acme`, or `:rainier` to the script name. For example: `npm run watch:api`.