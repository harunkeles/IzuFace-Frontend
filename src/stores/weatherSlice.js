import { createSlice } from '@reduxjs/toolkit'

//
export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weather: {}
  },
  reducers: {
    setWeatherState: (state, action) => {
        state.weather = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setWeatherState } = weatherSlice.actions

export default weatherSlice.reducer