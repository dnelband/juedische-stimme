export function facebook(state, action) {
    switch (action.type) {
        case "SET_FB_DATA":
            const { token, feed, events } = action.payload
            return { 
                ...state, 
                facebook: {
                    token,
                    feed,
                    events
                }
            };
        default:
            return state;
    }
}