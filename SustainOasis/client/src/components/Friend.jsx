import { PersonAddOutlined, PersonRemoveOutlined} from "@mui/icons-material";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Box, Card, Icon, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import {setIsGive} from 'state/index';

const Friend = ({ friendId, name, subtitle, userPicturePath, isGive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = friends.find((friend) => friend._id === friendId);

  var print = isGive ? "Give" : "Receive";


  // const posts = useSelector((state) => state.posts);
  // const isGive = posts.isGive;
  // const token = useSelector((state) => state.token);

  // const getPosts = async () => {
  //   const response = await fetch("http://localhost:3001/posts/", {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   dispatch(setPosts({ posts: data }));
  // };

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      
      <Box>
        <FlexBetween gap="1rem">
          {
            isGive ? 
            <Icon>
              <CardGiftcardIcon/>
            </Icon> :
            <Icon>
              <VolunteerActivismIcon/>
            </Icon> 
          }
          <Box>
            <IconButton
              size="large"
              onClick={() => patchFriend()}
              sx={{ backgroundColor: primaryLight, p:"0.1rem"}}>
              {isFriend ? (
                <PersonRemoveOutlined fontSize="medium" sx={{ color: primaryDark }} />
              ) : (
                <PersonAddOutlined fontSize="medium" sx={{ color: primaryDark }} />
              )}
            </IconButton>
          </Box>

        </FlexBetween>
      </Box>

    </FlexBetween>
  );
};

export default Friend;
