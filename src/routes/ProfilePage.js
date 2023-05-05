import "./style/profilePage.css";
import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [userName, setUserName] = useState('')
  console.log(url);


    const docRef = doc(db,"Users",`${auth.lastNotifiedUid}` );
    setTimeout(()=>{
      const docSnap = getDoc(docRef);
      docSnap.then((el)=>{
        setUserName(el.data().username)
      });
    }
    ,1000)
 

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  const handleSubmit = () => {
    const imageRef = ref(storage, `users/${auth.lastNotifiedUid}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) =>
            console.log(error.message, "error getting the image url")
          );
      })
  };

  return (
    <div id="profile-page">
      <img id="profile-picture" src={`https://firebasestorage.googleapis.com/v0/b/aca-project-35029.appspot.com/o/users%2F${auth.lastNotifiedUid}?alt=media&token=738d2f40-42e5-44df-b836-995e3c5ab4a6`} alt="avatar" />
	   	<input type="file" name="file" onChange={handleImageChange}/>		
      <button id="upload-button" onClick={handleSubmit}>
        Upload Image
      </button>
      <div id="info">
        <h3>Username: {userName}</h3>
      </div>
    </div>
  );
}

export default Profile;
