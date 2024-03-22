import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Signup = (props)=>{
    const [name , setName] = useState("");
    const [username , setUsername] = useState("");
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    
    const handleSignupClick = async  ()=>{
        const SIGNUP_URL='http://127.0.0.1:5000/signup';
        const data ={
            username,
            password,
            name
        }
        try{
            const res = await axios.post(SIGNUP_URL,data);
            window.location.href="/login"

        }catch(err){
            console.log(err);
            alert("Something went wrong");
        }
    }

    return (
        <div>
        <div className=" flex  flex-col w-1/3  p-16 justify-between gap-8 shadow-2xl rounded-xl   mt-24 mx-auto border-2  border-black">
            <h1 className='text-5xl'>Signup</h1>
            <span>Already have an Account ? <Link className="text-teal-300" to="/login">Login</Link></span>

            <input className="  border p-4 border-black h-12 rounded-md w-5/6" type="text"  placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input className="  border p-4 border-black h-12 rounded-md w-5/6" type="text"  placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input className="  border p-4 border-black h-12 rounded-md w-5/6" type="text"  placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <input className=" border p-4 border-black h-12 rounded-md w-5/6" type="password"  placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            
            <button className='w-1/2 py-4 rounded-2xl shadow-xl bg-slate-900 text-white  hover:bg-slate-800' onClick={handleSignupClick} > Signup </button>
        </div>

    </div>
    )
}


export default Signup;