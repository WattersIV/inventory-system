# Steps to run 
-  cd inventory-system/server
- run `npm i`
- touch `.env`
- Create new postgres database

Fill in these varibles to your .env file
DB_NAME= <br/>
DB_USER= <br/>
DB_PASSWORD= <br/>
DB_PORT= <br/>
JWT_KET= <br/>

- run `npm run dev`
- open another terminal 
- In the second terminal run :
1. `npm run migrate`
2. `npm run seed`
