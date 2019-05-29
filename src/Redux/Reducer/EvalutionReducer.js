const STATE_INITIAL = {
    evaluation:''
}

export default(state = STATE_INITIAL, action)=>{
    console.log(action)
    if(action.type == 'Evaluation'){
        return{...state, evaluation: action.payload}}
        
    return state
}