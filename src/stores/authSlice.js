import { createSlice } from '@reduxjs/toolkit'


export const auth = createSlice({
  name: 'auth',

  initialState: {
    authUser: {},
    username: '',
    password: ''
  },
  reducers: {
    setUsername: (state, action) => {
        state.username = action.payload 
    },
    setPassword: (state, action) => {
        state.password = action.payload 
    },
    login: (state, action) => {
        state.authUser = action.payload 
    },
    setIsUser: (state, action) => {
        state.isUser = action.payload 
    },
    
  }
})

export const { setUsername, setPassword, login, logout, setIsUser } = auth.actions

export default auth.reducer