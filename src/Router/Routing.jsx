import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../screen/Home';
import Login from '../screen/Login';
import Profile from '../screen/Profile';
import SignUp from '../screen/SignUp';

const Pvt_Route = () => {

   let userData = JSON.parse(localStorage.getItem("logInUser"))
   if(userData) {
       return <Profile />
   } else {
      return <Navigate to="/login"/>
   }
}
const HomePvt_Route = () => {
    let userData = JSON.parse(localStorage.getItem("logInUser"))
    if(userData) {
        return <Home />
    } else {
       return <Navigate to="/login"/>
    }
}

const Routing = () => {
    return (
        <>
        <Routes>
            <Route path = "/login" element = {<Login />}/>
            {/* <Route index element = {<Login />}/>
            <Route path='/signup' element = {<SignUp />}/> */}
            <Route path='/login' element = {<Login />}/>
            <Route index element = {<SignUp />}/>
            <Route path='/signup' element = {<SignUp />}/>
            <Route path='profile' element = {<Pvt_Route />}/>
             <Route path='/home' element = {<HomePvt_Route />}/>
        </Routes>
        </>
    );
};


export default Routing;