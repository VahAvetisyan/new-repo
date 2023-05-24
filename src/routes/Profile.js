import "./style/profilePage.css";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as React from "react";
import Input from "@mui/joy/Input";


export default function TabsBottomNavExample() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [userName, setUserName] = useState("");
  const [editingMode, setEditingMode] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  auth.currentUser.photoURL = url;

  const docRef = doc(db, "Users", `${auth.lastNotifiedUid}`);

  const docSnap = getDoc(docRef);
  docSnap.then((el) => {
    setUserName(el.data().username);
    setUrl(el.data().photoUrl);
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onEditButtonClick = () => {
    setEditingMode(!editingMode);
  };

  const onSaveButtonClick = async () => {
    const usersRef = doc(db, "Users", `${auth.lastNotifiedUid}`);
    setDoc(usersRef, { username: newUsername }, { merge: true });
    setEditingMode(!editingMode);
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
    <div id="profile" style={{ marginBottom: "100px", background: "#c6e0bf" }}>
      <div id="profile-page">
        {url ? (
          <img id="profile-picture" src={url} alt="avatar" />
        ) : (
          <img
            id="profile-picture"
            src={`https://firebasestorage.googleapis.com/v0/b/aca-project-35029.appspot.com/o/users%2Fdefault-avatar.jpg?alt=media&token=365ea4fa-30e6-42dc-aaca-876523d3158f`}
            alt="avatar"
          />
        )}
        <Input
          sx={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            paddingLeft: 0,
          }}
          type="file"
          name="file"
          onChange={handleImageChange}
          
        />
        <button id="upload-button" onClick={handleSubmit}   >
          Upload Image
        </button>
      </div>
      {editingMode ? (
        <span id="info" style={{ display: "inline-block" }}>
          <h3>
            New Username:
            <Input
              type="text"
              id="edit-username"
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </h3>
          <button onClick={onSaveButtonClick}>
            <b>SAVE</b>
          </button>
        </span>
      ) : (
        <div id="info">
          <h3>Username: {userName}</h3>
          <button onClick={onEditButtonClick}>
            <b>EDIT</b>
          </button>
        </div>
      )}
    </div>
  );
}
