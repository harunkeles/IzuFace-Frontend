import { createSlice } from '@reduxjs/toolkit'


export const discussions = createSlice({
  name: 'discussions',

  initialState: {
    discussions: {},
  },
  reducers: {
    setDiscussions: (state, action) => {
        state.discussions = action.payload 
    },
  }
})

export const { setDiscussions } = discussions.actions

export default discussions.reducer