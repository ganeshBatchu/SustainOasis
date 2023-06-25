import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  filters: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setIsGive: (state, action) => {
      state.user.isGive = action.payload.isGive;
    },
    setIsSatisfied: (state, action) => {
      state.user.IsSatisfied = action.payload.IsSatisfied;
    },
    setComments: (state, action) => {
      state.posts[state.posts.length-1] = action.payload;
    },
    setFilters: (state, action) => {
      state.receive = action.payload.receive;
      state.give = action.payload.give;
      state.satisfied = action.payload.satisfied;
      state.notSatisfied = action.payload.notSatisfied;
    }
    
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setIsGive, setIsSatisfied, setComments, setFilters} =
  authSlice.actions;
export default authSlice.reducer;
