import { configureStore } from '@reduxjs/toolkit'

import themeReducer from "./themeSlice"
import authReducer from "./authSlice"
import postReducer from "./postSlice"
import weatherReducer from "./weatherSlice"
import discussionReducer from "./discussionSlice"
import modalReducer from "./modalSlice"
import profileDetailSlice from './profileDetailSlice'


export default configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    posts: postReducer,
    weather: weatherReducer,
    discussions: discussionReducer,
    modal: modalReducer,
    profileDetail: profileDetailSlice,
  },
})