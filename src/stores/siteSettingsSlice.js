import { createSlice } from '@reduxjs/toolkit'

//
export const siteSettings = createSlice({
  name: 'siteSettings',
  initialState: {
    site_settings: JSON.parse(localStorage.getItem('lclStorage')) ? 
    JSON.parse(localStorage.getItem('lclStorage')).site_settings : {},
    //keles.muhammet
  },
  reducers: {
    setSiteSettings: (state, action) => {
        state.site_settings = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setSiteSettings } = siteSettings.actions

export default siteSettings.reducer