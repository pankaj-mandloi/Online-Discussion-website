import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login () {
    const [username,setUsername ] = useState("");
    const [password,setPassword ] = useState("");
    const navigate = useNavigate();
    const handleLoginClick = async ()=>{
        const LOGIN_URL='http://127.0.0.1:5000/login';
        const credentials = {
            username,
            password
        }
        console.log(username, password);
        try{
            const res=await axios.post(LOGIN_URL,credentials);
            navigate('/dashboard', { state:{username:res.data.username}})
            
        }catch(error){
            if(error.response.status==403){
                alert('Invalid Username or password');
            }
            setUsername("")
            setPassword("")
        }
        
    }
  return (
    <div>
        <div className=" flex  flex-col w-1/3  p-16 justify-between gap-8 shadow-2xl rounded-xl   mt-24 mx-auto border-2  border-black">
            <h1 className='text-5xl'>Login</h1>
            <input className="  border p-4 border-black h-12 rounded-md w-5/6" type="text"  placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <input className=" border p-4 border-black h-12 rounded-md w-5/6" type="password"  placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <span>Don't have an Account ? <Link className="text-teal-300" to="/signup">Signup</Link></span>
            <button className='w-1/2 py-4 rounded-2xl shadow-xl bg-slate-900 text-white  hover:bg-slate-800' onClick={handleLoginClick}> Login </button>
        </div>

    </div>
  ) 
}

export default Login;