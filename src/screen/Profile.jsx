import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../style/profile.css";

const Profile = (props) => {
  useEffect(() => {
    let posts = JSON.parse(localStorage.getItem("posts"));
    props.dispatch({ type: "postDataFromLS", posts: posts });
    let userData = JSON.parse(localStorage.getItem("logInUser"));
    console.log(userData);
    props.dispatch({
      type: "checkData",
      email: userData.email,
      password: userData.password,
      name: userData.name,
      uid: userData.uid,
      phoneNo: userData.phoneNo,
    });
  }, []);
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("logInUser");
    navigate("/login");
  };

  const [postData, setPostData] = useState({
    text: "",
    img: "",
    price: "",
  });
  const [updPostData, setUpdPostData] = useState({
    text: "",
    img: "",
    price: "",
    postUid: "",
    postUidandi: "",
  });

  const [show, setShow] = useState(false);
  const [showUpdModal, setShowUpdModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleUpdClose = () => {
    setShowUpdModal(false);
  };
  const savePost = () => {
    let postDb = {
      ...postData,
      postUid: props.checkUid ? props.checkUid : props.logInUid,
    };
    console.log(postDb.postUid);
    let arr = [];
    let oldPostData = JSON.parse(localStorage.getItem("posts"));
    if (oldPostData === null) {
      arr.push(postDb);
      localStorage.setItem("posts", JSON.stringify(arr));
      props.dispatch({ type: "addPost", posts: arr });
    } else {
      oldPostData.push(postDb);
      localStorage.setItem("posts", JSON.stringify(oldPostData));
      props.dispatch({
        type: "addPost",
        posts: oldPostData,
      });
    }
  };
  const loadImgElement = useRef();
  const loadUpdImgElement = useRef();

  const loadImg = (e) => {
    setPostData({ ...postData, img: e.target.value });
    loadImgElement.current.src = e.target.value;
  };
  const loadUpdImg = (e) => {
    setUpdPostData({ ...updPostData, img: e.target.value });
    loadUpdImgElement.current.src = e.target.value;
  };

  const createPost = () => {
    setShow(true);
  };
  const deletePost = (uid) => {
    let oldPostData = JSON.parse(localStorage.getItem("posts"));
    let flag = false;
    for (var i = 0; i < oldPostData.length; i++) {
      if (oldPostData[i].postUid + i === uid) {
        flag = true;
        console.log(oldPostData);
        oldPostData.splice(i, 1);
        console.log(oldPostData);
        localStorage.setItem("posts", JSON.stringify(oldPostData));
        props.dispatch({ type: "postDelete", posts: oldPostData });
      }
    }
  };
  const editPost = (uid) => {
    setShowUpdModal(true);
    let oldPostData = JSON.parse(localStorage.getItem("posts"));
    let flag = false;
    for (var i = 0; i < oldPostData.length; i++) {
      if (oldPostData[i].postUid + i === uid) {
        flag = true;
        setUpdPostData({
          ...updPostData,
          text: oldPostData[i].text,
          price: oldPostData[i].price,
          img: oldPostData[i].img,
          postUid: oldPostData[i].postUid,
          postUidandi: oldPostData[i].postUid + i,
        });
      }
    }
  };
  const updPost = (uidandi) => {
    console.log(uidandi);
    let postData = JSON.parse(localStorage.getItem("posts"));
    let flag = false;
    for (var i = 0; i < postData.length; i++) {
      if (postData[i].postUid + i === uidandi) {
        flag = true;
        postData.splice(i, 1, updPostData);
        localStorage.setItem("posts", JSON.stringify(postData));

        props.dispatch({ type: "postUpdate", posts: postData });
      }
    }
  };

  return (
    <div className="main">
        <span className="circle_one"></span>
      <span className="circle_two"></span>
      <div className="home_container">
      <Modal
        show={showUpdModal}
        onHide={handleUpdClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="post-heading"> <h1> Update Post </h1></Modal.Title>
        </Modal.Header>
        <Modal.Body className="post_inputbox">
          <input
            type="text"
            placeholder="Update Name"
            onChange={(e) =>
              setUpdPostData({ ...updPostData, text: e.target.value })
            }
            value={updPostData.text}
          />
          <input
            type="text"
            placeholder="Update Price"
            onChange={(e) =>
              setUpdPostData({ ...updPostData, price: e.target.value })
            }
            value={updPostData.price}
          />
          <input
            type="text"
            placeholder="Update Image url"
            onChange={(e) => loadUpdImg(e)}
            value={updPostData.img}
          />
          <div>
            <h1>{updPostData.text}</h1>
            <h3>{updPostData.price}</h3>

            <img ref={loadUpdImgElement} height="300px" width="450px" />
          </div>
        </Modal.Body>
        <Modal.Footer>
        <button onClick={() => updPost(updPostData.postUidandi)}>
            Update Post
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="post-heading"> <h1> Create Post</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="post_inputbox">
          <div className="inputdiv">
            <input
              type="text"
              placeholder="Object Name"
              onChange={(e) =>
                setPostData({ ...postData, text: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Object Price"
              onChange={(e) =>
                setPostData({ ...postData, price: e.target.value })
              }
            />
            {/* <input
              type="text"
              placeholder="Object Details"
              onChange={(e) =>
                setPostData({ ...postData, details: e.target.value })
              }
            /> */}
            <input
              type="text"
              placeholder="Object image url"
              onChange={(e) => loadImg(e)}
            />
          </div>
          </div>

          <div className="crtPostData">
            <h4>Name : {postData.text}</h4>
            <h4>Price : {postData.price}</h4>
          </div>
          <div className="crtPostImg">
            <img ref={loadImgElement} height="300px" width="450px" />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: "1px solid whitesmoke" }}>
        <button onClick={savePost} className="postBtn">
              Post
            </button>
        </Modal.Footer>
      </Modal>
      <div className="profile_flex" >
        <div className="my_profile ">
            <h3>Welcom to my Profile</h3>
          {/* <button onClick={updProf} className="updProfBtn">
            Update Profile
          </button> */}
          <div className="userDetails">
            <p className="namep">
              Name : {!props.loginName ? props.checkName : props.loginName}
            </p>
            <p className="emailp">
              Email : {!props.loginEmail ? props.checkEmail : props.loginEmail}
            </p>
          </div>
          <div className="profile_button">
          <button onClick={signOut} className="signOutBtn">
            Sign Out
          </button>
        <button onClick={createPost} className="crtPostBtn">
          Make a Post
        </button>
        </div>
        </div>
      </div>

      <hr />

      <div className="post_container">
        {props.posts
          ? props.posts.map((val, ind) => {
              return (
                <div
                  className="postDiv"
                  style={
                    val.postUid === props.checkUid || val.Uid === props.logInUid
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <div className="post_container">
                    <div className="icons">
                      <h3>My Post !</h3>
                      <div>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => editPost(val.postUid + ind)}
                        style={{ cursor: "pointer" }}
                        className="post_icon"
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => deletePost(val.postUid + ind)}
                        style={{ cursor: "pointer" }}
                        className="post_icon"
                      >
                        {" "}
                      </FontAwesomeIcon>
                      </div>
                    </div>
                    <h1 className={ind}>
                      {val.postUid === props.checkUid ||
                      val.Uid === props.logInUid
                        ? val.text
                        : null}
                    </h1>
                  
                  <h3>
                    {val.postUid === props.checkUid ||
                    val.Uid === props.logInUid ? (
                      <span>Price : {val.price}</span>
                    ) : null}
                  </h3>

                  <img
                    src={
                      val.postUid === props.checkUid ||
                      val.Uid === props.logInUid
                        ? val.img
                        : null
                    }
                    alt=""
                    width="300px"
                    height="200px"
                  />
                  </div>
                </div>
              );
            })
          : null}
      </div>
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
const newProfile = connect(mapReduxStateToProps)(Profile);

export default newProfile;
