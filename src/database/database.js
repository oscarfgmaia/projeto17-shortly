import pkg from "pg";
const {Pool} = pkg;
import dotenv from 'dotenv'
dotenv.config();

export const connectionDb = new Pool({
    host:'localhost',
    port:'5432',
    user:'postgres',
    password:'oscar984984',
    database:'shortly_database',
})