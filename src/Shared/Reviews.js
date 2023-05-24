import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { setSnackBarData } from "../redux/reducers/snackBarReducer";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import "../routes/MoviePageAttributes/comments.css";

export default function Reviews({ id }) {
  const [review, setReview] = useState([]);
  const [url, setUrl] = useState(null);
  const [userName, setUserName] = useState("");
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  let comments = [];

  const getComments = async () => {

    

    const docRef = collection(db, "Comments");
    const q = await getDocs(query(docRef, where("entityId", "==", id)));

    q.forEach((el) => {
      comments.unshift(el.data());
    });
    setReview(comments);
  };

  const docRef = doc(db, "Users", `${auth.lastNotifiedUid}`);

  const docSnap = getDoc(docRef);
  docSnap.then((el) => {
    setUserName(el.data()?.username);
    setUrl(el.data().photoUrl);
  });

  useEffect(() => {
    getComments();
  }, [review]);

  const handlerOnAddBtnClick = async () => {
    if (newComment !== "") {
      try {
        await addDoc(collection(db, "Comments"), {
          content: newComment,
        
          entityId: id,
          author: userName,
          addingTime: Date.now(),
          author_details: {
            name: userName,
            avatar_path: url? url: null,
          },
        });
        dispatch(
          setSnackBarData({
            open: true,
            message: "Comment successfully added",
            severity: "success",
          })
        );
      } catch (e) {
        dispatch(
          setSnackBarData({
            open: true,
            message: "Please Sign Up or Sign In",
            severity: "error",
          })
        );
      }
    } else {
      dispatch(
        setSnackBarData({
          open: true,
          message: "Error! Comment content is not valid",
          severity: "error",
        })
      );
    }
  };

  return (
    <div>
      <div id="add-comment">
        <Avatar src={url} />
        <input
          type="text"
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        <button
          onClick={() => {
            handlerOnAddBtnClick();
          }}
        >
          ADD COMMENT
        </button>
      </div>

      <div id="comments">
        {review.map((comment) => (
          <div key={comment.content} className="comment-content">
            <div className="author">
              <Avatar
                variant="circular"
                sx={{ width: 45, height: 45 }}
                alt={comment.author}
                src={comment.author_details.avatar_path}
              />
              <h4>{comment.author}</h4>
            </div>
            <h6>{comment.content}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}
