import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userId: String,
    username: String,
    password:String,
    email:String
});

export {userSchema}
