import mongoose from 'mongoose'
let connectionString = process.env.TEST_DATABASE;

if(process.env.NODE_ENV === 'production'){
    connectionString = process.env.PROD_DATABASE;
}

class Database {
   constructor() {
       this._connect();
   }

   _connect() {
       mongoose.connect(connectionString).then(()=>{
               console.log('Database connection successfully established');
           })
           .catch(error=>{
               console.error(error)
           })
   }
}

module.exports = new Database();