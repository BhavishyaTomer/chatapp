// Chat.js
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context';
import io from 'socket.io-client';
import logo from '../../assets/logjpg.jpg';
import './Chat.css';
import { Link } from 'react-router-dom';
import Message from '../message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { firebaseauth } from '../../firebase-config';

let socket;
const Chat = () => {
    const Navigate=useNavigate()
    const { username } = useContext(UserContext);
    const [message, setMessage] = useState('')
    const [msg, setMsg] = useState([])
    const [id, setId] = useState('')
    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('message', message, id);
        setMessage(''); // Clear the message input field
    }
    
    useEffect(() => {
        socket = io('http://localhost:5000');
        socket.on('connect', () => {
            setId(socket.id)
        });

        socket.emit('join', username);

        socket.on('welcome', (data) => {
            setMsg((prevMsg) => [...prevMsg, data]);
        });

        socket.on('userjoined', (s) => {
            console.log("triggred")
            console.log(s.message)
            setMsg((prevMsg) => [...prevMsg, s]);
        })

        socket.on('leave', (s) => {

            setMsg((prevMsg) => [...prevMsg, s]);

        })

        return () => {
            socket.disconnect(); // Disconnect from the server
            socket.off(); // Remove all event listeners
        }
    }, [])
    useEffect(() => {
        socket.on('message', (s) => {
            console.log("messages",s)
            setMsg((prevMsg) => [...prevMsg, s]);
        })
        return () => {
            socket.off();
        }
    }, [msg])
    const handleSingOut=async()=>{
try {
    await signOut(firebaseauth);
    Navigate('/login')
} catch (error) {
    console.log(error)
}
    
    }
    return (
        
        <>
        {console.log(msg)}
            <div className="chatPage">
                <div className="chatContainer">
                    <div className="header d-flex justify-content-between">
                        <img src={logo} alt="" className='img my-auto'/>
                        <Link to="/">
                        <i className="fa-solid fa-xmark m-4" onClick={handleSingOut}></i>
                        </Link>
                    </div>
                    <ReactScrollToBottom className="chatArea">
                        {msg.map((s, index) => {
                            return <Message key={index} message={s.message} classs={s.id===id?'right':'left'} user={s.id===id? "":s.user}/>
                        })}
                    </ReactScrollToBottom>
                    <div className="chatInput">
                        <input type="text" placeholder="Type your message here" className='message' onChange={(e) => setMessage(e.target.value)} />
                        <button className='send' onClick={sendMessage}><i className="fa-solid fa-paper-plane plane" style={{ color: '#dc143c', fontSize: '20px' }}></i></button>

                    </div>
                </div>
            </div>
        </>
    )
};

export default Chat;
