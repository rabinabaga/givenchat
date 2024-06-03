import {configureStore} from "@reduxjs/toolkit"
import {logger} from "redux-logger"
import userReducer from "./reducers/user.reducer"
import chatReducer from "./reducers/chat.reducer"


export const store = configureStore({
    reducer:{
        User: userReducer,
        Chat: chatReducer
    },
    //default middleware
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    //hydrated state, store initial value to state
    devTools:process.env.NODE_ENV!='production',
    preloadedState:{}
})

