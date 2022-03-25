import React, { useState, useEffect, useRef } from "react";
import '../style/signup.css';
import '../style/main.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate, Link } from "react-router-dom";
// import { Modal, Button } from "react-bootstrap";

const useKey = (key, cb) => {
  const callBackRef = useRef(cb);

  useEffect(() => {
    callBackRef.current = cb;
  });

  useEffect(() => {
    function handle(event) {
      if (event.code === key) {
        callBackRef.current(event);
      }
    }
    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key]);
};
const SignUp = () => {
  const navigate = useNavigate();
  const handleEnter = () => {
    signUp();
  };
  useKey("Enter", handleEnter);
  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let data = localStorage.getItem("usersData");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    uid: "",
  });

  const signUp = () => {
    if (
      !data &&
      String(userDetails.email).toLowerCase().match(validateEmail) &&
      userDetails.password.length >= 8 &&
      userDetails.name.length > 0
    ) {
      localStorage.setItem(
        "usersData",
        JSON.stringify([{ ...userDetails, uid: Math.random() * 10000 }])
      );
    } else if (
      userDetails.password.length === 0 ||
      userDetails.name === 0 ||
      userDetails.email === 0
    ) {
      alert("Please fill all fields");
    } else if (userDetails.password.length < 8) {
      alert("Password should be of 8 characters");
    } else if (
      String(userDetails.email).toLowerCase().match(validateEmail) &&
      data
    ) {
      let usersData = JSON.parse(data);
      let flag = false;
      for (var i = 0; i < usersData.length; i++) {
        if (userDetails.email === usersData[i].email) {
          alert("Account already exist");
          flag = true;
        }
      }
      if (flag === false) {
        usersData.push({ ...userDetails, uid: Math.random() * 1000 });
        localStorage.setItem("usersData", JSON.stringify(usersData));
        
      }
    }
  };
  return (
    <div className="main">
      <span className="circle_one"></span>
      <span className="circle_two"></span>
      <div className="container">
        <span className="heading">Sign up !</span>
        <span className="circle-1"></span>
        <span className="circle-2"></span>

        <div className="form">
          <form>
            <div className="inputbox">
              <p>Enter Name</p>
              <input
                type="text"
                onChange={(val) =>
                  setUserDetails({ ...userDetails, name: val.target.value })
                }
              />
            </div>
            <div className="inputbox">
                <p>Enter Email</p>
              <input
                type="email"
                onChange={(val) =>
                  setUserDetails({ ...userDetails, email: val.target.value })
                }
              />
            </div>
            <div className="inputbox">
            <p>Enter Password</p>
              <input
                type="password"
                onChange={(val) =>
                  setUserDetails({ ...userDetails, password: val.target.value })
                }
              />
            </div>
            <div className="inputbox">
            <input type="submit" value="Sign up" onClick={signUp} />
            </div>
            <div className="signup_link">
            <p>
              Already have an account Click on : <Link to="/login" className="links">Log In</Link>
            </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
