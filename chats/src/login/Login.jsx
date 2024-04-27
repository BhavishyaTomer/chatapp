import React from 'react'
import '../registraion/registration.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { firebaseauth } from '../firebase-config';
import { useState } from 'react';
import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logjpg.jpg';
import { useContext } from 'react';
import UserContext from '../context';

const Login = () => {
       const { username, setUsername } = useContext(UserContext);
  const navigate=useNavigate()
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const handleSignIn=async(e)=>{
   e.preventDefault();
   console.log("hitting",email,password)
   try{
    const userCredential=await signInWithEmailAndPassword(firebaseauth,email,password)
    setUsername(user.email)
    navigate("/chat")
    console.log("singed",userCredential)
   }catch(error){
    console.log(error)
   }
  }
  onAuthStateChanged(firebaseauth, (user) => {
    if (user) {
        setUsername(user.email)
    navigate("/chat")
      console.log("logged in",user)
    } else {
      console.log("not logged in")
    }
  })

return (
  <>
  <div className="registration">
  <img src={logo} alt="" className='logo m-3' />
  <div className='registrationContainer'>
  <div className="registrationBox">
    <h1 className='m-3'>Login</h1>

      <label className='mt-3'>
        Email:
        </label>
        <TextField id="standard-basic" label="Email" variant="standard" className='mt-2 fields' onChange={(e)=>setEmail(e.target.value)} value={email}/>
  
      <label className='mt-1'>
        Password:
        </label>
        <TextField id="standard-basic" label="passsword" variant="standard" className='mt-2 fields' onChange={(e)=>setPassword(e.target.value)} value={password}/>

        <Button className='submit mt-2'onClick={handleSignIn} >Register</Button>

  </div>
  </div>
  </div>
  </>
)
}

export default Login