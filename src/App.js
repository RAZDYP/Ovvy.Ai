import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'


// bootstrap import
import "bootstrap/dist/css/bootstrap.css";
import ImageUpload from './components/ImageUpload';
import SingleTaskDetails from './components/SingleTaskDetails';
import AllTasksDetails from './components/AllTasksDetails';
import SignUp from './components/SignUp';
import ProtectedRoutes from './services/ProtectedRoutes';



function App() {

  const [createToken, setCreateToken] = useState(true)
  const [haveToken, setHaveToken] = useState(false)
  const [token, setToken] = useState('')
  const [taskId, setTaskId] = useState('')


  return (

    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route path="/" element={<ProtectedRoutes />} >
          <Route path="/" element={<ImageUpload taskId={taskId} setTaskId={setTaskId} />} />
          <Route path="/task-details" element={<SingleTaskDetails taskId={taskId} />} />
          <Route path="/all-task-details" element={<AllTasksDetails />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
