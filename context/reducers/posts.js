export function posts(state, action) {
    switch (action.type) {
      case "SET_POSTS":
        return { ...state, posts: action.payload };
      case "SET_POST":
        return { ...state, post: action.payload };
      default:
        return state;
    }
}