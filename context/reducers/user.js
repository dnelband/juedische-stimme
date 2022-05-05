export function user(state, action) {
    switch (action.type) {
      case "LOGGED_IN_USER":
        return { ...state, user: action.payload };
      case "SET_USERS":
        return { ...state, users: action.payload };
      default:
        return state;
    }
}