import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userId: {type:String,required:true},
    username: {type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
});

userSchema.methods.getUserDate = ()=>{
    return{
        userId: this.userId,
        username: this.username,
        password: this.password,
        email: this.email
    }
}

const User = mongoose.model('User',userSchema)

// TODO: define the getter and setter methods for this schema

export {User}
