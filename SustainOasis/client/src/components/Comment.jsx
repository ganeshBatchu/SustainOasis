import { TextField } from '@mui/material';
import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {setPost} from "state";

export const Comment = (postId) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const handleKeyDown = event => {
    console.log(event.key);

    if (event.key === 'Enter') {
      event.preventDefault();
      patchComment(event.target.value);
    }
  };
  const patchComment = async (commentToSend) => {
    var unrefinedId = JSON.stringify(postId);
    var refinedID = unrefinedId.substring(11, unrefinedId.length-2);
    console.log(refinedID);
    var link = "localhost:3000/posts/" + refinedID + "/comments";
    console.log(link);
    const response = await fetch(link, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "application/json",
      },
      body: commentToSend,
    });
    const updatedPost = await response.json();
    updatedPost.comments.push(commentToSend);
    dispatch(setPost({ post: updatedPost }));
  };
  return (
    <div>
      <TextField
        label = "Add a comment"
        type="text"
        id="message"
        name="message"
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Comment;