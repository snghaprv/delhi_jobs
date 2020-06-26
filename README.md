# JOBS API 

DelhiJobs is an initiative by the Delhi government to help the migrant workers in finding jobs. This project is written in javascript using the express framework, MySQL as database and Redis for caching.

## System and Software Requirements: 
```bash
Node.js v10.16.0+
MySQL v8.0.20+
Redis v5.0.4+
 ```
## Deployment

git clone the repo using following command 
```bash
git clone https://github.com/snghaprv/delhi_jobs.git
```
create a .env file in root folder of the repo and provide following parameters.
```
NODE_ENV = <development> | <production>
DB_HOST = <MySQL HOST IP>
DB_USER = <MySQL USER_NAME>
DB_PASS = <MySQL PASSWORD>
DB_NAME = <MySQL DATABASE_NAME>
PORT =<PORT ON WHICH APP WILL RUN>
JWT_LOGIN_SECRET =<RANDOM_STRING>

KALEYRA_TRANSACTIONAL_API_KEY =<KALEYRA_API_KEY>
KALEYRA_PROMOTIONAL_API_KEY = <KALEYRA_API_KEY>
KALEYRA_SENDER_ID =<KALEYRA_SENDER_ID>
REDIS_HOST = <REDIS HOST>
REDIS_PORT = <REDIS PORT>
```
Install global dependencies: 
```javascript
npm install -g forever
```
Install project dependencies: 
```javascript
npm install
```

Create the tables in MySQL using the following command:
```javascript
node ./node_modules/sequelize-auto-migrations/bin/runmigration
```
Load Seed Data by running the following command:

```javascript
node_modules/.bin/sequelize db:seed:all
```
To run the run in development mode:
```javascript
npm start
```

To run the run in production mode:
```javascript
forever start app.js
```