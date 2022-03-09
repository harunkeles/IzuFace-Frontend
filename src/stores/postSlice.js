import { createSlice } from '@reduxjs/toolkit'


export const posts = createSlice({
  name: 'posts',

  initialState: {
    all_posts: {},
    single_post: {}

  },
  reducers: {
    setPosts: (state, action) => {
        state.all_posts = action.payload 
    },
    setSinglePost: (state, action) => {
      state.single_post = action.payload 
  },
    
  }
})

export const { setPosts, setSinglePost } = posts.actions

export default posts.reducer