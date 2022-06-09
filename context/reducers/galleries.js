export function galleries(state, action) {
    switch (action.type) {
      case "SET_GALLERY":
        return { ...state, gallery: { ...action.payload.gallery, images: action.payload.images} }
      case "SET_GALLERIES":
        return { ...state, galleries: action.payload };
      case "SET_HEADER_GALLERY":
        return { ...state, headerGallery: action.payload }
      default:
        return state;
    }
}