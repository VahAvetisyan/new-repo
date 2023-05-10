import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./comments.css";
import { setSnackBarData } from "../../redux/reducers/snackBarReducer";
import { useDispatch } from "react-redux";
import { LinearProgress } from "@mui/material";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function MovieReviews(props) {
  const id = props.id;
  const [review, setReview] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [url, setUrl] = useState(null);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  const getVideos = async () => {
    let api_key = "8cc8bb5915e1ce414955be2f44bcb790";
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api_key}&language=en-US&page=1`
    );
    let jsonData = await response.json();
    setReview(jsonData.results);
  };

  const docRef = doc(db, "Users", `${auth.lastNotifiedUid}`);

    const docSnap = getDoc(docRef);
    docSnap.then((el) => {
      setUserName(el.data().username);
      setUrl(el.data().photoUrl)
    });
  
  useEffect(() => {
    getVideos();
  }, [id]);

  const HandlerOnAddBtnClick = () => {
    {if(newComment !== ""){
      review.unshift(
          { author: userName,
            author_details: {
              avatar_path: "",
          },
          content: newComment ,
        });
        dispatch(
          setSnackBarData({
            open: true,
            message: "Comment successfully added",
            severity: "success",
          })
        );
        setNewComment("")
    }else{
      dispatch(
        setSnackBarData({
          open: true,
          message: "Error! Comment content is not valid",
          severity: "error",
        })
      );
    }}   
  };

  if (!review.length) {
    return <LinearProgress />;
  }

  return (
    <div>
      <div id="add-comment">
        <Avatar src={url}/>
        <input
          type="text"
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        <button
          onClick={() => {
            HandlerOnAddBtnClick();
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
                src={
                  comment.author_details.avatar_path
                    ? comment.author_details.avatar_path.slice(1)
                    : url}
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
