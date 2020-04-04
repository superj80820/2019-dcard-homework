# dcard-homework

[![Build Status](https://travis-ci.com/superj80820/dcard-homework.svg?branch=master)](https://travis-ci.com/superj80820/dcard-homework)

## API gateway

### Migrate

`npm run migrate up`

### Run

`go run main.go`

## dcardService

### Migrate

`DATABASE_URL=postgres://postgres:example@localhost:5432/postgres npm run migrate up`

### Create seed

`npx ts-node tools/testSeed.ts`

### Run

`npm run start`

---

## Tools

### adminmongo connect

1. Open browser. Then connect to `localhost:1234`
2. Set connection config
    ```
    Connection name: Any name
    Connection string: mongodb://root:example@mongo:27017
    ```

### adminpostgres connect

1. Open browser. Then connect to `localhost:8090`
2. Set connection config
    ```
    Username: postgres
    Password: example
    ```