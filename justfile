# See https://github.com/casey/just to understand what is this file

run: 
	PG_USER=iapau PG_HOST=localhost PG_DATABASE=iapau PG_PASSWORD=postgres PG_PORT=5432 npm start

db:
	psql -d iapau -U iapau -a -f migrations/iapau.sql

migration: 
	PGPASSWORD=${PG_PASSWORD} psql -d ${PG_DATABASE} -U ${PG_USER} -p ${PG_PORT} -h ${PG_HOST} -a -f migrations/iapau.sql


