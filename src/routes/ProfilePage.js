import "./style/profilePage.css";
import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Profile() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [userName, setUserName] = useState("");
  auth.currentUser.photoURL = url;

  const docRef = doc(db, "Users", `${auth.lastNotifiedUid}`);
  setTimeout(() => {
    const docSnap = getDoc(docRef);
    docSnap.then((el) => {
      setUserName(el.data().username);
      setUrl(el.data().photoUrl);
    });
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const imageRef = ref(storage, `users/${auth.lastNotifiedUid}`);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          const usersRef = doc(db, "Users", `${auth.lastNotifiedUid}`);
          setDoc(usersRef, { photoUrl: url }, { merge: true });
          setUrl(url);
        })
        .catch((error) =>
          console.log(error.message, "error getting the image url")
        );
    });
  };

  return (
    <div id="profile">
      <div id="profile-page">
        {auth ? (
          <img id="profile-picture" src={url} alt="avatar" />
        ) : (
          <img
            id="profile-picture"
            src={`https://firebasestorage.googleapis.com/v0/b/aca-project-35029.appspot.com/o/users%2Fdefault-avatar.jpg?alt=media&token=365ea4fa-30e6-42dc-aaca-876523d3158f`}
            alt="avatar"
          />
        )}
        <input type="file" name="file" onChange={handleImageChange} />
        <button id="upload-button" onClick={handleSubmit}>
          Upload Image
        </button>
      </div>
      <div id="info">
        <h3>Username: {userName}</h3>
      </div>
    </div>
  );
}

export default Profile;
