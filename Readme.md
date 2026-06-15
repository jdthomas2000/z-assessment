If postgres container is already setup in docker then eveyrting should work fine.

If not, create a new postgres datatable using

docker run --name pg-docker \
-e POSTGRES_PASSWORD=docker \
-d \
-p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql \
postgres

docker ps -a

docker exec -it <PSQL-Container-ID> bash

Psql - U postgres

CREATE DATABASE database_name;

.env file

DB_USER=your_user
DB_PASSWORD=your_password

on initial download npm i in root directory, backend directory, and frontend/template directory
