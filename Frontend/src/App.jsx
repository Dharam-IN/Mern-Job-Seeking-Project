// App.jsx
import React, { useContext, useEffect } from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Context } from './main';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Jobs from './components/Job/Jobs';
import JobDetails from './components/Job/JobDetails';
import MyJobs from './components/Job/MyJobs';
import PostJob from './components/Job/PostJob';
import Applications from './components/Application/Applications';
import MyApplications from './components/Application/MyApplications';
import NotFound from './components/NotFound/NotFound';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/user/getuser", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    fetchUser();
  }, [isAuthorized, setIsAuthorized, setUser]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/job/getall' element={<Jobs />} />
          <Route path='/job/:id' element={<JobDetails />} />
          <Route path='/job/post' element={<PostJob />} />
          <Route path='/job/me' element={<MyJobs />} />
          <Route path='/application/:id' element={<Applications />} />
          <Route path='/application/me' element={<MyApplications />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
