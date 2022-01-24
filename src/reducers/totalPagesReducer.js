export default function totalPagesReducer(state = 1, action) {
    switch (action.type) {
        case 'TOTAL_PAGES':
            return action.totalPages
        default:
            return state
    }
}