# iapau-backend

Api and client serving for the iapau assotion site

## How it works

  It uses express.js for the api part.
  To serve front, at build step, the backend git clone :
    - https://github.com/hcaumeil/iapau-datachallenges
    - https://github.com/hcaumeil/iapau-site

  This 2 repos uses https://github.com/hcaumeil/iapau-components
  as their ui library.
    
  There is also the code analysis tool :
  https://github.com/MatisToniutti/iapau-analytics

  The api connect to a pg database.
  If you launch project by hand, you need to run migration/iapau.sql with psql.

  There is also auth + endpoints auth checking with https://github.com/biscuit-auth/biscuit-wasm

  To start api, the backend need some environment variables, like in this exemple :

  PG_DATABASE="iapau"
  PG_HOST="localhost"
  PG_PASSWORD="postgre"
  PG_PORT="5432"
  PG_USER="iapau"
  BISCUIT_KEY="095290569481f9ecd9f59e5cf52323769c4943bc8c20c722289b775ab4d9080f"

## Deploy 

  $ git clone git@github.com:MatisToniutti/iapau-analytics.git
  $ docker-compose build
  $ docker-compose up

