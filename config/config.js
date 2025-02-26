require('dotenv').config();
const pg = require('pg');

module.exports = {
    development: {
        username: "postgres",
        password: "root",
        database: "db_project",
        host: "127.0.0.1",
        dialect: "postgres",
        dialectModule: pg,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
    production:{
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD, 
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_HOST,
        port: process.env.SERVER_PORT, 
        dialect: "postgres",
        dialectModule: pg,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    }
}