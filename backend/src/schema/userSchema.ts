import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    userId: {type:String,required:true},
    username: {type:String,required:true},
    password:{type:String,required:true},
    email: {
        type:String,
        required:true,
        validate:(value)=>{return validator.isEmail(value)}
    }
});

userSchema.methods.getUserDate = ()=>{
    return{
        userId: this.userId,
        username: this.username,
        password: this.password,
        email: this.email
    }
};

const UserModel = mongoose.model('User',userSchema);

export {UserModel}
