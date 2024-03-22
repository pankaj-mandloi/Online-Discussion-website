import mongoose from "mongoose";
import User from "./UserSchema.js";
const {Schema} = mongoose;
const PostSchema = new Schema({
    text:{
        type:String,
    },
    createdBy:{
        type:String,
        reqired:true
    },
    createdAt:{
        type:Date,
        required:true
    },
    likes:[],
    comments:[]
});
const Post = mongoose.model('Post',PostSchema);

export default Post;

 