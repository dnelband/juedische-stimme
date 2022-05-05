export function mediaItems(state, action) {
    switch (action.type) {
      case "SET_MEDIA_ITEMS":
        return { ...state, mediaItems: action.payload };
      default:
        return state;
    }
}