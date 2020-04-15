import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
    userIdUSA: {type:String,required:true},
    userIdUSSR: {type:String,required:true},
    gameId:{type:String, required,true},
});

gameSchema.methods.getUserDate = ()=>{
    return{
        userId: this.userId,
        username: this.username,
        password: this.password,
        email: this.email
    }
}

const Game = mongoose.model('Game',gameSchema)


export {Game}
