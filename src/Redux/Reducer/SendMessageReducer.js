const STATE_INITIAL = {
    message:'',
}

export default(state = STATE_INITIAL, action)=>{
    console.log(action)
    if(action.type == 'ModifyMessage'){
        return{...state, message: action.payload}}
    if(action.type == 'SendSucess'){
        return{...state, message: ''}
    }
    return state
}