import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true,"Please include your name"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "please include your password"]
    },
    email: {
        type:String,
        unique:true,
        lowercase:true,
        required:[true,"Please include your email"],
        validate:(value)=>{return validator.isEmail(value)}
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre("save", async function(next){
    console.log("calling the pre save method");
   const user = this;
   if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password,8);
   }
    console.log(`The password would be: ${user.password}`);
   next();
});

userSchema.methods.generateAutToken = async function(){
    const user = this;
    const token = jwt.sign({ _id: user._id, username: user.username, email: user.email },
        "secret");
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

// search for user by email and password.
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error("invalid login credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        throw new Error("Invalid Login details")
    }
    return user;
};


const User = mongoose.model('User',userSchema);
export {User}
