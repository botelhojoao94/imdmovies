export default function currentPageReducer(state = 1, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        case 'PAGE':
            return action.currentPage
        default:
            return state
    }
}