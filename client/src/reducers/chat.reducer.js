import { createSlice } from "@reduxjs/toolkit";

const ChatSlicer = createSlice({
  name: "Chat",
  initialState: {
    selectedChat: null,
    chats:null
  },

  reducers: {
    setSelectedChat: (state, action) => {
      
      state.selectedChat = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    hello: (state, action) => {
      //statema mathiko initial stateko value aauncha
      // state.loggedInChat = {
      //     name:"Rabina Baga"
      // }
      // console.log(action.payload);
    },
  },
});

export const { hello,setChats, setSelectedChat } = ChatSlicer.actions;
export default ChatSlicer.reducer;
