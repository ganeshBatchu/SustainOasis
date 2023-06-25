import { TextField, Box, Divider, Typography, useTheme, IconButton, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PostsWidget from "./PostsWidget";
import {getPosts} from "./PostsWidget";


import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  AddBox,
  MarginOutlined
} from "@mui/icons-material";
import { withTheme } from "@emotion/react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { setPosts } from "state";
import { setFilters } from "state";

import React from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const accent = palette.primary.main;

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const [receive, setReceive] = React.useState(null);
  const [give, setGive] = React.useState(null);
  const [satisfied, setSatisfied] = React.useState(null);
  const [notSatisfied, setNotSatisfied] = React.useState(null);



  const patchReceivePosts = async() => {
    const response = await fetch("http://localhost:3001/posts/filters/receive", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({filter: "received"}),
    });
    const data = await response.json();

    dispatch(setFilters({ filter: data }));

    setReceive(data.receive);
    const response2 = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data2 = await response2.json();
    //console.log(data2);
    console.log("In patch posts" + data2)
    dispatch(setPosts({ posts: data2 }));

  };

  const patchSatisfiedPosts = async() => {
    const response = await fetch("http://localhost:3001/posts/filters/satisfy", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({filter: "satisfied"}),
    });
    const data = await response.json();

    dispatch(setFilters({ filter: data }));
    setSatisfied(data.satisfied);
    const response2 = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data2 = await response2.json();
    dispatch(setPosts({ posts: data2 }));

  };

  const patchNotSatisfiedPosts = async() => {
    const response = await fetch("http://localhost:3001/posts/filters/notsatisfy", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({filter: "notSatisfied"}),
    });
    const data = await response.json();

    dispatch(setFilters({ filter: data }));
    setNotSatisfied(data.notSatisfied);
    console.log("Going to getFeedPosts");
    const response2 = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data2 = await response2.json();
    dispatch(setPosts({ posts: data2 }));

  };


  // const patchNotSatisfiedPosts = async() => {
  //   const response = await fetch("http://localhost:3001/posts/filters/something", {
  //   //const response = await fetch("http://localhost:3001/posts/filters/something", {
  //     method: "PATCH",
  //     headers: { Authorization: `Bearer ${token}` },
  //     body: JSON.stringify({filter: "notSatisfied"}),
  //   });
  //   const data = await response.json();

  //   dispatch(setFilters({ filter: data }));
  //   setNotSatisfied(data.notSatisfied);
  //   const response2 = await fetch("http://localhost:3001/posts", {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data2 = await response2.json();
  //   dispatch(setPosts({ posts: data2 }));

  // };

  const patchGivePosts = async() => {
    const response = await fetch("http://localhost:3001/posts/filters/give", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({filter: "give"}),
    });
    const data = await response.json();

    dispatch(setFilters({ filter: data }));
    setGive(data.give);
    const response2 = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data2 = await response2.json();
    //console.log(data2);
    console.log("In patch posts" + data2)
    dispatch(setPosts({ posts: data2 }));

  };

  

  return (
    <WidgetWrapper>
      
      <Box>
          <Typography variant="h4" color={dark} fontWeight="500">Filters</Typography>
      </Box>

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <IconButton 
            onClick={ () => {
            patchGivePosts()}}>
            {give ? (
              <CardGiftcardIcon sx={{ color: dark }} />
            ) : (
              <CardGiftcardIcon sx = {{color: accent}}/>
            )}
          </IconButton>
          <Typography color={medium}>Give</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">

        <IconButton 
          onClick={ () => {
            patchReceivePosts()}}>
          {receive ? (
            <VolunteerActivismIcon sx={{ color: dark }} />
          ) : (
            <VolunteerActivismIcon sx = {{color: accent}}/>
          )}
        </IconButton>
        <Typography color={medium}>Received</Typography>
      </Box>
      </Box>

      <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
        <IconButton 
          onClick={ () => {
            patchSatisfiedPosts()}} >
          {satisfied ? (
            <CheckBoxIcon sx={{ color: dark }} />
          ) : (
            <CheckBoxIcon sx = {{color: accent}}/>
          )}
        </IconButton>
        <Typography color={medium}>Fulfilled</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="1rem">
        <IconButton 
          onClick={ () => {
            patchNotSatisfiedPosts()}}>
          {notSatisfied ? (
              <CheckBoxOutlineBlankIcon sx={{ color: dark }} />
            ) : (
              <CheckBoxOutlineBlankIcon sx = {{color: accent}}/>
            )}
        </IconButton>
        <Typography color={medium}>Open</Typography>
      </Box>

    </WidgetWrapper>
    
  );
};
export default AdvertWidget;
