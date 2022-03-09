import { createSlice } from '@reduxjs/toolkit'


export const modal = createSlice({
  name: 'modal',

  initialState: {
    modalIsOpen: false,
    modelID: 0,
    modelDetail: {}
  },
  reducers: {
    setModalIsOpen: (state, action) => {
        state.modalIsOpen = action.payload 
    },
    setModalID: (state, action) => {
      state.modelID = action.payload 
    },
    setModalDetail: (state, action) => {
      state.modelDetail = action.payload 
    },
  }
})

export const { setModalIsOpen, setModalID, setModalDetail } = modal.actions

export default modal.reducer