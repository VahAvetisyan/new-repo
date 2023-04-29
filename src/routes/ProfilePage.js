import "./style/profilePage.css";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

function Profile() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = () => {
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) =>
            console.log(error.message, "error getting the image url")
          );
        setImage(null);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div id="profile-page">
      <img id="profile-picture" src={url} alt="avatar" />
	   	<input type="file" name="file" onChange={handleImageChange}/>		
      <button id="upload-button" onClick={handleSubmit}>
        Upload Image
      </button>
      <div id="info">
        <h3>Fullname: MARIO</h3>
        <h5>Gender: Male</h5>
        <h5>Age: 48</h5>
        <h5>Bio: Asenq te hamapatasxanabar</h5>
      </div>
    </div>
  );
}

export default Profile;
