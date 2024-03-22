import mongoose from "mongoose";
const {Schema} = mongoose;


const UserSchema= new Schema({
    username:{
        type:String,
        unique:true
    },
    password:String,
    name:String,
});
const User =   mongoose.model('User',UserSchema); 

export default User;