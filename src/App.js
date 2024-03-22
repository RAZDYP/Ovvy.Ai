import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbaar from './components/Navbaar';
import CreateToken from './components/CreateToken';
import HaveToken from './components/HaveToken';
import TokenTab from './components/TokenTab';
import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'


// bootstrap import
import "bootstrap/dist/css/bootstrap.css";
import Login from './components/Login';
import ImageUpload from './components/ImageUpload';
import SingleTaskDetails from './components/SingleTaskDetails';


function App() {


  // localStorage.setItem('token', token)

  const [createToken, setCreateToken] = useState(true)
  const [haveToken, setHaveToken] = useState(false)
  const [token, setToken] = useState('')
  const [taskId, setTaskId] = useState('')

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [isLoggedIn, setIsLoggedIn] = useState(true)


  const handleCreateTokenTab = () => {
    setCreateToken(true)
    setHaveToken(false)
  }

  const handleHaveTokenTab = () => {
    setCreateToken(false)
    setHaveToken(true)
  }

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true)
      window.location.href = '/upload-images'
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="App">
          <Navbaar />
          <div className="d-flex align-items-center justify-content-center ">
            <div className="card border-0 w-100   main-homepage-card">
              <TokenTab
                handleCreateTokenTab={handleCreateTokenTab}
                handleHaveTokenTab={handleHaveTokenTab}
              />
              <div className="create-token-page-main border">
                {createToken && <CreateToken token={token} setToken={setToken} />}
                {haveToken && <HaveToken token={token} />}
              </div>
            </div>
          </div>
        </div>} />
        <Route path="/login" element={<Login username={username} password={password} setPassword={setPassword} setUsername={setUsername} handleLogin={handleLogin} />} />
        <Route path="/upload-images" element={isLoggedIn ? <ImageUpload taskId={taskId} setTaskId={setTaskId} /> : <Navigate to="/login" />} />
        <Route path="/task-details" element={isLoggedIn ? <SingleTaskDetails taskId={taskId} /> : <Navigate to="/login" />} />


      </Routes>
    </Router>
  );
}

export default App;
