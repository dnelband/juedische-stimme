export function comments(state, action) {
    switch (action.type) {
      case "SET_COMMENTS":
        return { ...state, comments: action.payload };
      default:
        return state;
    }
}