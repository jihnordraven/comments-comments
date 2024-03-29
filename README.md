<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Important!

To start the whole application on local machine with each docker iamge - go to https://github.com/jihnordraven/comments-users-auth and follow instructions №1

## Important!

## Description

comments nest.js microservice | handle websocket gateway (create/get/update/delete comments) | upload images/txt

## Prerequirements for local development

1. Needs to have docker desktop installed on your machine

2. Create a new .env file -> Copy .local.env and paste it into .env

## Launch rabbitmq & postgres & redis with docker

```bash
# run rabbitmq container on port:5672 (web: http://localhost:15672 (guest:guest))
$ docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmq \
  -e RABBITMQ_DEFAULT_USER=admin \
  -e RABBITMQ_DEFAULT_PASS=admin \
  rabbitmq:management

$ docker logs rabbitmq
```

```bash
# run postgres container on port:5432 (connect: psql postgresql://admin:admin@localhost:5432)
$ docker run -d --name postgres -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin postgres

$ docker logs postgresql
```

```bash
$ docker run -d -p 6379:6379 --name redis redis --requirepass admin

$ docker logs redis
```

```bash
# to stop or delete these containers you can follow:
$ docker stop -container_name-
$ docker rm -container_name-
$ docker rmi -container_name-
```

## Note

There are two ways to launch this application:

## Way №1 ( manually )

Install dependecies

```bash
# If you don't have yarn on your machine yet
$ npm install -g yarn

# create database & push schema
$ npx prisma db push

$ yarn install
```

Start application

```bash
$ yarn dev # watch mode

$ yarn start # development mode

$ yarn debug # debug mode

$ yarn prod # production mode
```

Now the application is listening Socket.io gateway on http://localhost:9200/comments

## Way №2 ( with docker )

Build docker image

```bash
$ docker build -t comments-comment:latest .

$ docker run -d --name comments-comments-container comments-comments:latest

$ docker logs comments-comments-container
```

Check application logs

```bash
$ docker exec -it comments-comments-container:latest sh
```

Now the application is listening Socket.io gateway on http://localhost:9200/comments

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Stay in touch

-   Author - Anton Deulia
-   Telegram - @fa2pac

## License

Nest is [MIT licensed](LICENSE).
