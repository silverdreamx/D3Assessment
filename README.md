## NodeJS API Assessment

This is the source code for my submission for GovTech's D3 Hiring NodeJS API Assessment. There are several ways to get the code up and running for your testing purposes:

1. Run straight from a hosted server
2. Run from a Docker container
3. Run the server locally on your machine


### 1. Run from hosted server
This set of code is hosted at the following url: [http://18.139.165.226](http://18.139.165.226) which you can use to access the following APIs:

1. POST [http://18.139.165.226/api/register](http://18.139.165.226/api/register)
2. GET [http://18.139.165.226/api/commonstudents](http://18.139.165.226/api/commonstudents)
3. POST [http://18.139.165.226/api/suspend](http://18.139.165.226/api/suspend)
4. POST [http://18.139.165.226/api/retrievefornotifications](http://18.139.165.226/api/retrievefornotifications)

### 2. Run from a Docker container
-- todo


### 3. Setting up the source code on your local machine
You need to install the following:

1. [Node.js v10.16.2](https://nodejs.org/dist/v10.16.2/)
2. [MySQL Community Server v8.0.17](https://dev.mysql.com/downloads/mysql/)

After installing and pulling the source code from here, please navigate to the root directory of this repository and run the following commands:

    npm install .
    npx sequelize-cli db:migrate

These will install the necessary dependencies and set up the mySQL database properly.

Then, you can start up the server by running the following command:

    npm start

You can also run the unit tests by using the following command:

    npm test


## API Endpoint Testing 
If you have installed [Postman](https://www.getpostman.com/), you can access the API collection and environment in the `/postman` folder in the source code, by using the Import function in the application.
