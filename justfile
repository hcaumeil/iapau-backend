# See https://github.com/casey/just to understand what is this file

run: 
	BISCUIT_KEY="095290569481f9ecd9f59e5cf52323769c4943bc8c20c722289b775ab4d9080f" PG_USER=iapau PG_HOST=localhost PG_DATABASE=iapau PG_PASSWORD=postgres PG_PORT=5432 npm start

db:
	psql -d iapau -U iapau -a -f migrations/iapau.sql

migration: 
	PGPASSWORD=${PG_PASSWORD} psql -d ${PG_DATABASE} -U ${PG_USER} -p ${PG_PORT} -h ${PG_HOST} -a -f migrations/iapau.sql


