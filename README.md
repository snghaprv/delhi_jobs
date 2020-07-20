# JOBS API 

DelhiJobs is an initiative by the Delhi government to help the migrant workers in finding jobs. This project is written in javascript using the express framework, MySQL as database and Redis for caching.

## System and Software Requirements: 
```bash
Node.js v10.16.0+
MySQL v8.0.20+
Redis v5.0.4+
 ```
 
 The current project is using KALEYRA for sending SMS. To change the SMS provider , change the following snippet in servicers/SMS.js file
 
 ```javascript
 let url = `https://api-global.kaleyra.com/v4/?method=sms&api_key=${KALEYRA_KEYS[message_type]}&to=91${phone}&message=${content}&format=1122334455667788991010___XXXXXXXXXX&sender=${process.env.KALEYRA_SENDER_ID}`
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
node scripts/seeder.js 
```
To run the application in development mode: choose NODE_ENV as development
```javascript
npm start
```

To run the application in production enviorment: Change NODE_ENV in .env to production and use forever or pm2 for running the application
```javascript
forever start app.js
```
