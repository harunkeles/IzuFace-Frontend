import { createSlice } from '@reduxjs/toolkit'


export const profileDetail = createSlice({
  name: 'profileDetail',

  initialState: {
    profile_detail: {},
  },
  reducers: {
    setProfileDetail: (state, action) => {
        state.profile_detail = action.payload 
    },
    
  }
})

export const { setProfileDetail } = profileDetail.actions

export default profileDetail.reducer