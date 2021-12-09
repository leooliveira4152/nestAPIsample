## Description

Nest.js simple API that works with video files & mySQL.
POST method inserts files into mySQL tabase.
GET method list all entries, with upload date, video duration and an internal video link (not optimal, but since this is a local/test project, there's no need to upload them to somewhere else)

## Prerequisites
- You need an .env file with some params to successfully connect to mySQL server. If the referring server is planned to be local, then you'll need to install mySQL;
- There's a possibility that you'll need to increase mySQL max allowed packet. If so, you can do this query to do so (upgrading max_allowed_packet temporarily to 100Mb):
```
SET GLOBAL net_buffer_length=1024000;
SET GLOBAL max_allowed_packet=1024000000;
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

[MIT licensed](LICENSE).
