import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import '../style/login.css';
import '../style/main.css';

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
const Login = (props) => {
  const handleEnter = () => {
    signIn();
  };
  useKey("Enter", handleEnter);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    uid: "",
  });
  // const [showInpPass, setShowInpPass] = useState(false)
  // const passValid = () => {
  //     !showInpPass ? setShowInpPass(true) : setShowInpPass(false)
  // }
  const signIn = () => {
    let data = JSON.parse(localStorage.getItem("usersData"));
    let flag = false;
    if (data) {
      for (var i = 0; i < data.length; i++) {
        if (
          userDetails.email === data[i].email &&
          userDetails.password === data[i].password
        ) {
          flag = true;
          let Name = data[i].name;

          props.dispatch({
            type: "SignIn",
            email: userDetails.email,
            password: userDetails.password,
            name: Name,
            uid: data[i].uid,
          });
          localStorage.setItem(
            "logInUser",
            JSON.stringify({
              email: userDetails.email,
              password: userDetails.password,
              name: Name,
              uid: data[i].uid,
            })
          );
          navigate("/profile");
        } else if (
          userDetails.email === data[i].email &&
          userDetails.password.length === 0
        ) {
          alert("Please enter password!");
        }
      }
    }
    if (
      flag === false &&
      userDetails.email.length > 0 &&
      userDetails.password.length > 0
    ) {
      alert("You have entered wrong password or email!");
    }
  };

  return (
    <div className="main">
      <span className="circle_one"></span>
      <span className="circle_two"></span>
      <div className="container">
        <span className="heading">Log in !</span>
        <span className="circle-1"></span>
        <span className="circle-2"></span>

        <div className="form">
          <form>
            <div className="inputbox">
                <p>Enter Email</p>
              <input
                type="text"
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
            <input type="submit" value="Login" onClick={signIn} />
            </div>
            {/* <p class="forget">Forgot Password? <Link to='/' className="links">Click Here</Link> </p> */}
          </form>
        </div>
        <div className="signup_link">
                <p>Don't have an account? <Link to='/signup' className="links">Sign Up</Link></p>
            </div>
      </div>
    </div>
  );
};

const newLogIn = connect()(Login);

export default newLogIn;
