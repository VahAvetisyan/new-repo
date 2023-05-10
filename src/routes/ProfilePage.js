import "./style/profilePage.css";
import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// function Profile() {
//   const [image, setImage] = useState(null)
//   const [url, setUrl] = useState(null)
//   const [userName, setUserName] = useState("")
//   const [editingMode, setEditingMode] = useState(false)
//   const [newUsername, setNewUsername] = useState('')
//   auth.currentUser.photoURL = url

//   const docRef = doc(db, "Users", `${auth.lastNotifiedUid}`)

//     const docSnap = getDoc(docRef)
//     docSnap.then((el) => {
//       setUserName(el.data().username)
//       setUrl(el.data().photoUrl)
//     })

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0])
//     }
//   }

//   const onEditButtonClick = () => {
//     setEditingMode(!editingMode)
//   }

//   const onSaveButtonClick = async () => {
//     const usersRef = doc(db, "Users", `${auth.lastNotifiedUid}`)
//     setDoc(usersRef, {username: newUsername}, {merge: true})
//     setEditingMode(!editingMode)
//   }

//   const handleSubmit = () => {
//     const imageRef = ref(storage, `users/${auth.lastNotifiedUid}`)
//     uploadBytes(imageRef, image).then(() => {
//       getDownloadURL(imageRef)
//         .then((url) => {
//           const usersRef = doc(db, "Users", `${auth.lastNotifiedUid}`)
//           setDoc(usersRef, {photoUrl: url}, {merge: true})
//           setUrl(url)
//         })
//         .catch((error) =>
//           console.log(error.message, "error getting the image url")
//         )
//     })
//   }

//   return (
//     <div id='profile'>
//       <div id='profile-page'>
//         {auth ? (
//           <img id='profile-picture' src={url} alt='avatar' />
//         ) : (
//           <img
//             id='profile-picture'
//             src={`https://firebasestorage.googleapis.com/v0/b/aca-project-35029.appspot.com/o/users%2Fdefault-avatar.jpg?alt=media&token=365ea4fa-30e6-42dc-aaca-876523d3158f`}
//             alt='avatar'
//           />
//         )}
//         <input type='file' name='file' onChange={handleImageChange} />
//         <button id='upload-button' onClick={handleSubmit}>
//           Upload Image
//         </button>
//       </div>
//       {
//         editingMode?
//         <div id='info'>
//         <h3>Username:<input type="text" id="edit-username" onChange={(e)=>setNewUsername(e.target.value)}/></h3>
//         <button onClick={onSaveButtonClick}><b>SAVE</b></button>
//       </div>:
//       <div id='info'>
//         <h3>Username: {userName}</h3>
//         <button onClick={onEditButtonClick}><b>EDIT</b></button>
//       </div>
//       }
//     </div>
//   )
// }

// export default Profile

import * as React from "react";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Search from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

export default function TabsBottomNavExample() {
  const [index, setIndex] = React.useState(0);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [userName, setUserName] = useState("");
  const [editingMode, setEditingMode] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  let [settingsState,setSettingsState]=useState();
  let value=false;
    auth.currentUser.photoURL = url

    const docRef = doc(db, "Users", `${auth.lastNotifiedUid}`)

      const docSnap = getDoc(docRef)
      docSnap.then((el) => {
        setUserName(el.data().username)
        setUrl(el.data().photoUrl)
      })

    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0])
      }
    }

    const onEditButtonClick = () => {
      setEditingMode(!editingMode)
    }

    const onSaveButtonClick = async () => {
      const usersRef = doc(db, "Users", `${auth.lastNotifiedUid}`)
      setDoc(usersRef, {username: newUsername}, {merge: true})
      setEditingMode(!editingMode)
    }

    const handleSubmit = () => {
      const imageRef = ref(storage, `users/${auth.lastNotifiedUid}`)
      uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            const usersRef = doc(db, "Users", `${auth.lastNotifiedUid}`)
            setDoc(usersRef, {photoUrl: url}, {merge: true})
            setUrl(url)
          })
          .catch((error) =>
            console.log(error.message, "error getting the image url")
          )
      })
    }
  const colors = ["primary", "info", "danger", "success"];


  return (
    <>
    
    <Box
      sx={{
        flexGrow: 1,
        m: -3,
        p: 3,
        py: 5,
        borderRadius: "sm",
        bgcolor: `${colors[index]}.600`,
      }}
    >
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        onChange={(event, value) => setIndex(value)}
        sx={(theme) => ({
          borderRadius: "xl",
          maxWidth: 400,
          mx: "auto",
          boxShadow: theme.shadow.sm,

          "--Tabs-gap": "8px",
          "--joy-shadowChannel": theme.vars.palette[colors[index]].darkChannel,
          [`& .${tabClasses.root}`]: {
            boxShadow: "none",
            borderRadius: "lg",
            whiteSpace: "nowrap",
            transition: "0.3s",
            fontWeight: "lg",
            flex: 1,
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.72,
            },
          },
        })}
      >
        <TabList variant="plain" sx={{ "--ListItemDecorator-size": "28px" }}>
          <Tab
            orientation="vertical"
            {...(index === 1 && { variant: "soft", color: colors[1] })}
          >
            <ListItemDecorator>
              <FavoriteBorder />
            </ListItemDecorator>
            WatchList
          </Tab>
          <Tab
            orientation="vertical"
            {...(index === 2 && { variant: "soft", color: colors[2] })}
          >
            <ListItemDecorator onClick={()=>setSettingsState(!value)}>
              <SettingsIcon />
            </ListItemDecorator>
            Settings
          </Tab>
        </TabList>
      </Tabs>
      
    </Box>
    
    <div>

      {settingsState===true?   <div id='profile' style={{marginTop:'100px'}}>
       <div id='profile-page'>
         {auth ? (
          <img id='profile-picture' src={url} alt='avatar' />
        ) : (
          <img
            id='profile-picture'
            src={`https://firebasestorage.googleapis.com/v0/b/aca-project-35029.appspot.com/o/users%2Fdefault-avatar.jpg?alt=media&token=365ea4fa-30e6-42dc-aaca-876523d3158f`}
            alt='avatar'
          />
        )}
        <input type='file' name='file' onChange={handleImageChange} />
        <button id='upload-button' onClick={handleSubmit}>
          Upload Image
        </button>
      </div>
      {
        editingMode?
        <div id='info'>
        <h3>Username:<input type="text" id="edit-username" onChange={(e)=>setNewUsername(e.target.value)}/></h3>
        <button onClick={onSaveButtonClick}><b>SAVE</b></button>
      </div>:
      <div id='info'>
        <h3>Username: {userName}</h3>
        <button onClick={onEditButtonClick}><b>EDIT</b></button>
      </div>
      }
    </div>:<></>}
      </div>
      </>
  );
}
