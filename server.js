import express from 'express';
import mongoose from 'mongoose';
import User from './models/UserSchema.js';
import Post from './models/PostSchema.js';
import cors from 'cors';
const app=express();
const PORT=5000;
app.use(express.json());
app.use(cors());


const URI="mongodb+srv://mandloipankaj86:veerhanuman@cluster0.fa9uauv.mongodb.net/BlogApp?retryWrites=true&w=majority"

//connect to the database
const connectDatabase= async ()=>{
    try{
        await mongoose.connect(URI);
        console.log("Database connected Sucessfully");
    }catch(err){
        console.log(err);
    }
}
connectDatabase(); //function call for connecting database


//api for signing up for new user 
//params required username , password , name

app.post('/signup',async (req,res)=>{
    if(!req.body.username){
        res.status(400).send({message:'Username required!'})
        return;
    }
    if(!req.body.password){
        res.status(400).send({message:'password required!'})
        return;
    }
    if(!req.body.name){
        res.status(400).send({message:'name required!'})
        return;
    }
    const user = await User.findOne({'username':req.body.username}).exec();
    
    if(user!=null){
        res.status(403).send({'message':'This username is Already Taken'});
        return;
    }
    const newUserInstance = User({
        username:req.body.username,
        password:req.body.password,
        name:req.body.name
    });
    newUserInstance.save();

    res.status(200).send({message:'Account created Succesfully'});
})





//api for creating a new post 
app.post('/create-post',async (req,res)=>{
    if(!req.body.text){
        res.status(400).send({});
        return;
    }
    if(!req.body.createdBy){
        res.status(400).send({});
        return;
    }
    const user = await User.findOne({username:req.body.createdBy}).exec();
    console.log(user)
    if(!user){
        res.status(403).send({message:'Not Authorized'});
        return;
    }
    const newPostInstance = new Post({
        text:req.body.text,
        createdBy:req.body.createdBy,
        createdAt: new Date()
    });
    newPostInstance.save();
    res.status(200).send({message:'Post Created Successfully'});
    

})


// api for logging in 
app.post('/login',async (req,res)=>{
    if(!req.body.username){
        res.status(400).send({message:'Username required!'});
        return;
    }
    if(!req.body.password){
        res.status(400).send({message:'Password required'});
        return;
    }
    const userInstance = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(!userInstance){
        res.status(403).send({message:'Invalid Username or password'});
        return;
    }
    res.status(200).send({message:'Login Successful',username:req.body.username});
    
})



//api gor fetching all the posts 
app.get('/posts',async (req,res)=>{
    try{
        const posts = await Post.find({}).exec();
        res.status(200).send({posts})
    }catch(error){
        res.status(400).send({message:'Something Went wrong',error})
        return;
    }
})


//api for fetching post of a particular id
app.get('/posts/:id',async (req,res)=>{
    try{
        const post = await Post.findOne({_id:req.params.id}).exec();
        res.status(200).send({post})
    }catch(error){
        res.status(400).send({message:'Something Went wrong',error})
        return;
    }
})
app.post('/comment/:id',async (req,res)=>{
    
    
        
        const post = await Post.findOne({_id:req.params.id}).exec();
        if(post){
            post.comments.push({text:req.body.text,createdBy:req.body.createdBy});
            post.save();
        }
        res.status(200).send({post})
    
    // catch(error){
    //     res.status(400).send({message:'Something Went wrong',error})
    //     return;
    // }
})


app.listen(PORT,()=>{
    console.log("Server Started Succesfully");
})
