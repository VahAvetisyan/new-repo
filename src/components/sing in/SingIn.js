import { useState } from "react";
import "./singIn.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setSnackBarData } from "../../redux/reducers/snackBarReducer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Registration() {
  let [password, setPassword] = useState();
  let [mail, setMail] = useState();
  let [username, setUsername] = useState();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const SingUp = async (event) => {
    event.preventDefault();
    if(username){
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        mail,
        password
      );
      console.log(userCred);
      dispatch(
        setSnackBarData({
          open: true,
          message: "Account successfully created",
          severity: "success",
        })
      );
      const usersRef = doc(db, "Users", `${auth.lastNotifiedUid}`);
      setDoc(usersRef, { username: username }, { merge: true });
      navigate("/");
    } catch (error) {
      dispatch(
        setSnackBarData({
          open: true,
          message: `${error.message.slice(10)}`,
          severity: "error",
        })
      );
    }
  }else{
    dispatch(
      setSnackBarData({
        open: true,
        message: `Please Enter Username`,
        severity: "error",
      })
    );
  }
  }
  const SingIn = async (event) => {
    event.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, mail, password);
      window.history.back()
    } catch (error) {
      dispatch(
        setSnackBarData({
          open: true,
          message: `${error.message.slice(10)}`,
          severity: "error",
        })
      );
    }
  };
  return (
    <>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true"></input>
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="txt"
              placeholder="User name"
              required=""
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required=""
              onChange={(e) => {
                setMail(e.target.value);
              }}
            ></input>
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <button className="SignIn-Button" onClick={SingUp}>
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form>
            <label
              htmlFor="chk"
              aria-hidden="true"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            >
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required=""
              onChange={(e) => {
                setMail(e.target.value);
              }}
            ></input>
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <button className="SignIn-Button" onClick={SingIn}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registration;
