
const STATE_INITIAL = {
    ReceiveMessages:'',
    loadingMessage: false
}

export default(state = STATE_INITIAL, action)=>{
    if(action.type == 'ReceiveMessages'){
        return{...state, ReceiveMessages: action.payload}
    }
    if(action.type == 'LoadingMessage'){
        return{...state, loadingMessage: true}
    }
    return state
}