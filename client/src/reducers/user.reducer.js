import { createSlice } from "@reduxjs/toolkit";

const UserSlicer = createSlice({
    name:"user",
    initialState:{
        loggedInUser: null
    },

    reducers:{
        setLoggedInUser:(state,action) => {
            state.loggedInUser = action.payload
        },
        hello:(state,action) => {
            //statema mathiko initial stateko value aauncha

            // state.loggedInUser = {
            //     name:"Rabina Baga"
            // }
            // console.log(action.payload);
        }
    }
})

export const {hello, setLoggedInUser} = UserSlicer.actions;
export default UserSlicer.reducer;