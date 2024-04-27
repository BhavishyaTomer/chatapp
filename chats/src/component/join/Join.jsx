// Join.js
import React, { useContext } from 'react';
import './join.css';
import logo from '../../assets/logjpg.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import UserContext from '../../context';

const Join = () => {
    const { username, setUsername } = useContext(UserContext);

    return (
        <div className='joinPage'>
            <div className='joinContainer'>
                <img src={logo} alt="" className='logo m-3' />
                <h1>Pant Chat</h1>
                <TextField 
                    id="filled-basic" 
                    label="Username" 
                    variant="filled" 
                    InputLabelProps={{
                        style: { color: 'white' }
                    }}
                    InputProps={{
                        style: { color: 'white' }
                    }} 
                    onChange={(e)=>setUsername(e.target.value)} 
                />
                <Link to="/chat">
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#d3eacb', color: 'black' }}
                        size="large"
                        className="mt-2"
                    >
                        Join
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Join;
