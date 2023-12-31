import { Box, useMediaQuery, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import background from "backgroundImage/background.png";


import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

import {setFilters} from "state";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  var filters = useSelector((state) => state.filters);
  
  const getFilter = async () => {
    const response = await fetch(`http://localhost:3001/posts/get/filters`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    filters = data;
    dispatch(setFilters({filters : data}));
    return filters;
  };

  useEffect(() => {
    console.log("At Filter");
    filters = getFilter();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const myStyle={
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'repeat-y',
      height:'500vh',
      marginTop:'-70px',
      fontSize:'50px',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
  }; 
  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Box padding = "2rem"></Box>
      <Box>
        <div style={myStyle}>
          <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
          >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id} />
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis="26%">
              <AdvertWidget 
                satisfied={true}
                notSatisfied={false}
                give={true}
                receive={true} />
              <Box m="2rem 0" />
              <FriendListWidget userId={_id} />
            </Box>
          )}
        </Box>
        </div>
      </Box>
    </Box>
  );
};

export default HomePage;
