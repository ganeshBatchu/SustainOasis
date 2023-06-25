import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";

import { Box, Divider, IconButton, TextField, Typography, useTheme, Icon, Button} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

//import { Comment } from "components/Comment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";



const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  isGive,
  satisfied,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => (state.user.firstName+  " " + state.user.lastName));
  
  const loggedInUser = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const boolIsGive = Boolean(isGive);
  const likeCount = Object.keys(likes).length;

  const isSatisfied = satisfied;
  var found = isSatisfied ? "Fulfilled" : "Open";

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const Comment = (postId) => {
  
    const [message, setMessage] = useState('');
    const handleKeyDown = event => {
      console.log(event.key);

      if (event.key === 'Enter') {
        event.preventDefault();
        newPatchComment(event.target.value);
      }
    };

    const newPatchComment = async (commentToSend) => {
      var pid = (postId["postId"]);
      const response = await fetch(`http://localhost:3001/posts/${pid}/comments`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: (loggedInUserId + ": " + commentToSend) }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };

    return (
      <div>
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          size = "70"
        />
      </div>
    );
  };

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const newSatisfied = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/satisfied`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  

  
  
  



  
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        isGive={isGive}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>

          {/* <FlexBetween gap="0.3rem">
            <IconButton onClick={newPatchComment}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween> */}

          <FlexBetween gap="0.3rem">
            <IconButton onClick={newSatisfied} disabled={(postUserId==loggedInUser) ? false:true}>
              {isSatisfied ? (
                <CheckBoxIcon sx={{ color: primary }} />
              ) : (
                <CheckBoxOutlineBlankIcon sx={{ color: primary }} />
              )}
            </IconButton>
            <Typography>{found}</Typography>
          </FlexBetween>

        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
      <Box>
        <Comment
          postId={postId}/>
      </Box>
    </WidgetWrapper>
  );
};

export default PostWidget;
