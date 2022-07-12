import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    headerGallery:null,
    gallery:null,
    galleries:[]
}

const galleriesSlice = createSlice({
  name: 'galleries',
  initialState,
  reducers: {
    setGalleries: (state, action) => {
      state.galleries = action.payload
    },
    setGallery: (state, action) => {
        state.gallery = { 
            ...action.payload.gallery, 
            images: action.payload.images
        }
    },
    setHeaderGallery: (state, action) => {
        state.headerGallery = action.payload
    }
  }
})

export const { setGalleries, setGallery, setHeaderGallery } = galleriesSlice.actions

export default galleriesSlice.reducer