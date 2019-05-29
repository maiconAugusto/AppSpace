


const INITIAL_STATE = {
    name:'',
    emailContact:'',
    phoneNumber:'',
    city:'',
    loadButtonAddContact: false,
    addContactError:''
}

export default (state = INITIAL_STATE, action)=>{
    if(action.type == 'Modifyname'){
        return{...state, name: action.payload}}
    
    if(action.type == 'Modifyemail'){
        return{...state, emailContact: action.payload}} 
    
    if(action.type == 'ModifyPhonenumber'){
        return{...state, phoneNumber: action.payload}}

    if(action.type == 'ModifyCity'){
        return{...state, city: action.payload}}

    if(action.type == 'LoadButtonSucess'){
        return{...state, loadButtonAddContact: true}}
    
    if(action.type == 'SendError'){
        return{...state, loadButtonAddContact: false,addContactError: action.payload }}

    if(action.type == 'SendSucess'){
        return{...state, loadButtonAddContact: false, addContactError:''}
    }
    return state
}