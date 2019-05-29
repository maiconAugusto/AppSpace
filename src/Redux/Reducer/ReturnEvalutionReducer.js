const INITIAL_STATE = {
    returnEvalution:''
}

export default(state= INITIAL_STATE, action)=>{
    if(action.type == 'ReturnSucess'){
        return{...state, returnEvalution: action.payload}
    }
    return state
}