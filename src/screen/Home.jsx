import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "../style/profile.css";

const Home = (props) => {
  useEffect(() => {
    let posts = JSON.parse(localStorage.getItem("posts"));
    props.dispatch({ type: "postDataFromLS", posts: posts });
  }, []);
  let userData = JSON.parse(localStorage.getItem("logInUser"));
  console.log(userData);
  props.dispatch({
    type: "checkData",
    email: userData.email,
    password: userData.password,
    name: userData.name,
    uid: userData.uid,
  });

  return (
    <div>
      <div className="ProfileComp">
        <div className="profCompdiv1">
          <div className="userDetails">
            <p className="namep">
              Name : {!props.loginName ? props.checkName : props.loginName}
            </p>
            <p className="emailp">
              Email : {!props.loginEmail ? props.checkEmail : props.loginEmail}
            </p>
          </div>
        </div>
      </div>
      <div className="postsDiv">
        {props.posts.map((val, ind) => {
          return (
            <div className="postDiv">
              <div className="postDivp1">
                <h1>{val.text}</h1>
              </div>
              <h3>
                <span>Price : {val.price}</span>
              </h3>
              <p>
                {" "}
                <span>Details : {val.details}</span>{" "}
              </p>
              <img src={val.img} alt="" width="200px" height="150px" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapReduxStateToProps = (state) => {
  return {
    loginEmail: state.login.email,
    checkEmail: state.checkData.email,
    loginName: state.login.name,
    checkName: state.checkData.name,
    posts: state.posts,
    checkUid: state.checkData.uid,
    logInUid: state.login.uid,
    logInPhoneNo: state.login.phoneNo,
    checkPhoneNo: state.checkData.phoneNo,
  };
};
const newHome = connect(mapReduxStateToProps)(Home);

export default newHome;
