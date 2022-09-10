import { Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/SignUp/Register';
import CreateQuestion from './pages/CreateQuestion/CreateQuestion';

import Home from './pages/Home/home'
import Question from './pages/Question/Question';
import React from 'react';
function App() {
  const [user] = React.useState(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  })
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home user={user} />} />
        <Route path="login" element={<Login user={user} />} />
        <Route path="signup" element={<Register user={user} />} />
        <Route path="create-question" element={< CreateQuestion user={user}/>} />
        <Route path="question/:id" element={<Question user={user} />} />
      </Routes>
    </div>
  );
}

export default App
