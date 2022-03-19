import { createSlice } from '@reduxjs/toolkit'

var val = localStorage.getItem('lclStorage') ? localStorage.getItem('lclStorage') : null
//
export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    dark: false
    //keles.muhammet
  },
  reducers: {
    setDarkMode: (state, action) => {
        state.dark = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setDarkMode } = themeSlice.actions

export default themeSlice.reducer