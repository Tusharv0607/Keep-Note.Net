import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './components/home';
import TaskStates from './context/TaskStates';
import AddTask from './components/addTask';
import AuthState from './context/AuthState';
import Login from './components/Login';
import Signup from './components/SignUp';
const App = () => {
  return (
    <>
      <BrowserRouter>
      <AuthState>
      <TaskStates>
        <Navbar />
       <div className='container'>
        <Routes>
          <Route exact path="/" element={<Home/>}>
          </Route>
          <Route exact path="/Login" element={<Login/>}>
          </Route>
          <Route exact path="/Signup" element={<Signup/>}>
          </Route>
          <Route exact path="/addTask" element={<AddTask/>}>
          </Route>
        </Routes>
        </div>
      </TaskStates>
      </AuthState>
      </BrowserRouter>
    </>
  );
}

export default App;
