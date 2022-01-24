export default function titleReducer(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_TITLE':
            return {title: action.title, id: action.id, typeTitle: action.typeTitle}
        default:
            return state
    }
}