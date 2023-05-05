import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import "./comments.css"
import { setSnackBarData } from "../../redux/reducers/snackBarReducer";
import { useDispatch } from "react-redux";
import { LinearProgress } from "@mui/material";

let addComments = []

export default function MovieReviews(props) {
  const dispatch = useDispatch();
  let [review, setReview] = useState([]);
  let [newComment, setNewComment] = useState(null)
  const id = props.id;
  
  const getVideos = async () => {
    let api_key = "8cc8bb5915e1ce414955be2f44bcb790";
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api_key}&language=en-US&page=1`
    );
    let jsonData = await response.json();
    setReview(jsonData.results);
  };



  const HandlerOnAddBtnClick = () => {
    if(newComment){
      addComments.unshift({
        content: newComment,
        author: "guest",
        author_details: {
          author_path: "",
          name: "guest"
        }
        
      }
      
      )
      dispatch(
        setSnackBarData({
          open: true,
          message: "Comment successfully added",
          severity: "success",
        })
      );
    }    
  }
  
  useEffect(()=>{
    HandlerOnAddBtnClick()
    addComments = review;
  },[])

  useEffect(() => {
    getVideos();
  }, [id]);

  if(!addComments){
    return <LinearProgress />
  }

  return (
    <div>
      <div id="add-comment">
      <Avatar />
      <input type="text" onChange={(e)=>{setNewComment(e.target.value)}}/>
      <button onClick={()=>{HandlerOnAddBtnClick()}}>ADD COMMENT</button>
      </div>
      
    <div id="comments">
     
      {addComments.map((comment) => (
      <div key={comment.content} className="comment-content">
        <div className="author">
        <Avatar variant="circular" sx={{ width: 45, height: 45 }} alt={comment.author} src={comment.author_details.avatar_path?(comment.author_details.avatar_path).slice(1):null} />
        <h4>{comment.author}</h4>
        </div>
        <h6>{comment.content}</h6>
        </div>
        ))}
    </div>
    </div>
  );
}
