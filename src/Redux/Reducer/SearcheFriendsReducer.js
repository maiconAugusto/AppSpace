const INITIAL_STATE ={
    users:''
}

export default(state = INITIAL_STATE, action)=>{
    if(action.type == 'UsersSpace'){
        return{...state, users: action.payload}
    }
    return state
}