import React, { useState } from 'react'
import logo from '../assets/logjpg.jpg';
import './registration.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { firebaseauth } from '../firebase-config';
import { createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Registration = () => {
   const navigate=useNavigate()
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const handleSignup=async(e)=>{
     e.preventDefault();
     console.log("hitting",email,password)
     try{
      const userCredential=await createUserWithEmailAndPassword(firebaseauth,email,password)
      console.log("singed",userCredential)
      navigate('/login')
     }catch(error){
      console.log(error)
     }
    }
  
  return (
    <>
    <div className="registration">
    <img src={logo} alt="" className='logo m-3' />
    <div className='registrationContainer'>
    <div className="registrationBox">
      <h1 className='m-3'>Registration</h1>

        <label className='mt-3'>
          Email:
          </label>
          <TextField id="standard-basic" label="Email" variant="standard" className='mt-2 fields' onChange={(e)=>setEmail(e.target.value)} value={email}/>
    
        <label className='mt-1'>
          Password:
          </label>
          <TextField id="standard-basic" label="passsword" variant="standard" className='mt-2 fields' onChange={(e)=>setPassword(e.target.value)} value={password}/>

          <Button className='submit mt-2'onClick={handleSignup} >Register</Button>

    </div>
    </div>
    </div>
    </>
  )
}

export default Registration