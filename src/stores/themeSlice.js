import { createSlice } from '@reduxjs/toolkit'

//
export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    dark: false
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