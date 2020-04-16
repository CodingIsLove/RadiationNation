import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password:{type:String,required:true},
    email: {
        type:String,
        unique:true,
        lowercase:true,
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
