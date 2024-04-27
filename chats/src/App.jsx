import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Join from './component/join/Join';
import Chat from './component/chat/Chat';
import UserContext from './context';
import Registration from './registraion/Registration';
import Login from './login/Login';

function App() {
  const [username, setUsername] = React.useState('');


  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
