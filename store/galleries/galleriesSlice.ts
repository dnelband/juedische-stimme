import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../store';
import type { Image } from 'types/image.type';
import type { Gallery } from 'types/gallery.type';

export interface GalleriesState {
  headerGallery: Gallery;
  gallery: Gallery;
  galleries: Gallery[];
}

let initialState: GalleriesState = {
    headerGallery:null,
    gallery:null,
    galleries:[]
}

type SetGalleryPayloadAction = {
  payload: {
    gallery: Gallery;
    images: Image[];
  }
}

const galleriesSlice = createSlice({
  name: 'galleries',
  initialState,
  reducers: {
    setGalleries: (state: RootState, action: PayloadAction) => {
      state.galleries = action.payload
    },
    setGallery: (state: RootState , action: SetGalleryPayloadAction) => {
        state.gallery = { 
            ...action.payload.gallery, 
            images: action.payload.images
        }
    },
    setHeaderGallery: (state: RootState, action: PayloadAction) => {
        state.headerGallery = action.payload
    }
  }
})

export const { setGalleries, setGallery, setHeaderGallery } = galleriesSlice.actions

export default galleriesSlice.reducer