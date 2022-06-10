export function categories(state, action) {
    switch (action.type) {
        case "SET_CATEGORIES":
            return { ...state, categories: action.payload };
        case "SET_CATEGORY":
            return { ...state, category: action.payload };
        default:
            return state;
    }
}