# nodejs-time-log-project

## Setup project in the first time
- Build and start containers by docker-compose for development
```
$ docker-compose up dev
```
- Seed data
```
$ docker exec -it time_log_dev bash
$ ./node_modules/.bin/sequelize db:migrate
$ ./node_modules/.bin/sequelize db:seed:all
```
Now we can develop as normal

## Running unit test
```
$ docker-compose up test
```
