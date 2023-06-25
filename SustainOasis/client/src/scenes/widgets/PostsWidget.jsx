import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setFilters } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false}) => { // userId is MINE
  const dispatch = useDispatch();
  
  const posts = useSelector((state) => state.posts);
  
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  

  useEffect(() => {
    // patchFilteredPosts();
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const patchFilteredPosts = async () => {

    console.log("About to Filter posts");
  
    const response = await fetch(`http://localhost:3001/posts/filters`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      //body: JSON.stringify({filter: "satisfied"}),
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  
  //console.log(posts.satisfied);
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          isGive,
          satisfied
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            isGive={isGive}
            satisfied={satisfied}
          />
        )
      )}
    </>

  )
  
  
};

export default PostsWidget;
