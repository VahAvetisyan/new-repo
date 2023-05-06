import { useState } from "react"
import "./singIn.css"
  import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setSnackBarData } from "../../redux/reducers/snackBarReducer";
import { signInWithEmailAndPassword } from "firebase/auth";
  function  Registration (){
    
    let [password,setPassword]=useState();
    let [mail,setMail]=useState();
    let [username,setUsername]=useState();
    let navigate=useNavigate();
let dispatch=useDispatch()
const SingUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, mail, password,username);
      dispatch(
        setSnackBarData({
          open: true,
          message: "ACCOUNT SUCCESSFULLY CREATED",
          severity: "success",
        })
      );
      navigate("/");
    } catch (error) {
      dispatch(
        setSnackBarData({
          open: true,
          message: `${(error.message).slice(10)}`,
          severity: "error",
        })
      );
    }
  };
     const SingIn = async (event) => {
        event.preventDefault();
        try {
            const userCred = await signInWithEmailAndPassword(auth, mail, password,username);
           
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
    <>
    	<div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"></input>
        	<div class="signup">
				<form>
					<label for="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="txt" placeholder="User name" required="" onChange={(e)=>{setUsername(e.target.value)}}></input>
					<input type="email" name="email" placeholder="Email" required="" onChange={(e)=>{setMail(e.target.value)}}></input>
					<input type="password" name="pswd" placeholder="Password" required="" onChange={(e)=>{setPassword(e.target.value)}}></input>
					<button  onClick={SingUp}>Sign up</button>
				</form>
			</div>

			<div class="login">
				<form>
					<label for="chk" aria-hidden="true"  onChange={(e)=>{setUsername(e.target.value)}}>Login</label>
					<input type="email" name="email" placeholder="Email" required="" onChange={(e)=>{setMail(e.target.value)}}></input>
					<input type="password" name="pswd" placeholder="Password" required="" onChange={(e)=>{setPassword(e.target.value)}}></input>
					<button onClick={SingIn}>Login</button>
				</form>
			</div>

		
	</div>
    
    
    </>
    )
  }
  export default Registration