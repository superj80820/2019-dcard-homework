# dcard-homework

[![Build Status](https://travis-ci.com/superj80820/dcard-homework.svg?branch=master)](https://travis-ci.com/superj80820/dcard-homework)

## 整體系統

![](https://i.imgur.com/4QjBb4E.png)

## 整體介紹

透過Golang的Gin架設API gateway來當作microservice的統一路口，並利用此特性來對有需求的DcardService添加rateLimit_middleware。

會這樣實作的目標是希望DcardService能夠符合single responsibility principle，只去管Dcard相關的事物即可，rateLimit_middleware這種「檢查」層級的邏輯移交到API gateway，這樣能夠分享此middleware至不同microservice，並且也可配合ACL middleware這樣有相似性質的middleware來實作，提高cohesion。

## 申請條件與實作

* 熟悉 Golang 或是以下的 Node.js 框架: express, koa:
    1. 透過Golang實作API gateway
    2. Node.js & express & typescirpt實作DcardService
* 熟悉一種以上相關的資料庫，包含但不限於：PostgreSQL, MySQL, MongoDB
    1. API_gateway的rateLimit_middleware是透過MongoDB實作
    2. DcardService的抽卡系統是透過PostgreSQL實作
* 有撰寫 Testing 經驗
    1. API_gateway擁有unit test
    2. DcardService擁有unit test
* 熟悉 CI, CD 概念
    1. 使用travis在更新source code時測試

## 驗證rateLimit_middleware是否有符合「申請作業」的預期

1. 透過docker啟動mongo, postgres
    ```
    docker-compose up
    ```
2. 初始化API gateway的資料庫
    ```
    $ npm install
    $ npm run migrate up
    ```
3. 啟動API gateway
    ```
    $ go run main.go
    ```
4. 初始化dcardService的資料庫
    ```
    $ cd ./microservice/dcardService
    $ npm install
    $ DATABASE_URL=postgres://postgres:example@localhost:5432/postgres npm run migrate up
    ```
5. 對DB產生假資料
    ```
    $ npx ts-node tools/testSeed.ts
    ```
6. 啟動dcardService
    ```
    npm start
    ```
7. 呼叫抽卡API
    ```
    curl --request GET \
    --url http://localhost:8080/dcard/random
    ```
8. 符合預期
    * 擁有X-RateLimit-Remaining與X-RateLimit-Reset
        ```
        HTTP/1.1 200 OK
        Content-Length: 359
        Content-Type: application/json; charset=utf-8
        Date: Sat, 04 Apr 2020 14:54:33 GMT
        Etag: W/"167-QXfjcAfXDw5HN4EYuzk5jrkSi8U"
        X-Powered-By: Express
        X-Ratelimit-Remaining: 999
        X-Ratelimit-Reset: 2020-04-04T23:52:48+08:00
        Connection: close

        [
            {
                "id": 2,
                "name": "York",
                "birthday": "2017-01-07T15:48:16.000Z",
                "socialize": "Single",
                "school": "National Taiwan University",
                "department": "Computer Science",
                "interestsAndExpertise": "Basketball",
                "club": "Guitar",
                "course": "Machine Learning",
                "country": "Taipei",
                "troubles": "Swimming",
                "exchangeable": "Drawing",
                "trying": "Climbing",
                "createdAt": "2020-04-04T06:53:47.578Z"
            }
        ]
        ```
    * 擁有一小時內嘗試1000次以上會限制requests的效果
        ```
        HTTP/1.1 429 Too Many Requests
        Content-Type: application/json; charset=utf-8
        Date: Sat, 04 Apr 2020 14:56:42 GMT
        Content-Length: 29
        Connection: close

        {
            "error": "Too Many Requests"
        }

        ```

## 測試

* API gateway
    ```
    $ go test ./test
    ```
* DcardService
    ```
    $ cd ./microservice/dcardService
    $ npm run test
    ```

## Tools

### adminmongo連線

1. 打開瀏覽器，連結至`localhost:1234`
2. 設置連線參數
    ```
    Connection name: Any name
    Connection string: mongodb://root:example@mongo:27017
    ```

### adminpostgres連線

1. 打開瀏覽器，連結至`localhost:8090`
2. 設置連線參數
    ```
    Username: postgres
    Password: example
    ```