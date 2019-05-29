


const INITIAL_STATE = {
    name: null,
    emailContact:null,
    occupation:null,
    city:null,
    country:null,
    loadingButton: false,
    messagerro: ''
}

export default(state = INITIAL_STATE, action)=>{
    console.log(action)
    if(action.type == 'ModifyNameContact'){
        return{...state, name: action.payload}}

    if(action.type == 'ModifyEmailContact'){
        return{...state, emailContact: action.payload}}

    if(action.type == 'ModifyModifyOccupation'){
        return{...state, occupation: action.payload}}

    if(action.type == 'ModifyCityContact'){
        return{...state, city: action.payload}}

    if(action.type == 'ModifyCityCountry'){
        return{...state, country: action.payload}}
    
    
    if(action.type == 'EditSucess'){
        return{...state , loadingButton: false, messagerro: '' }
    }
    if(action.type == 'ModifyCountry'){
        return{...state, country: action.payload}
    }
    if(action.type == 'EditError'){
        return{...state ,loadingButton: false}
    }

    if(action.type == 'LoadingButton'){
        return{...state, loadingButton: true}
    }
    if(action.type == 'ErroEditUser'){
        return{...state, messagerro: action.payload}
    }
        
    return state
}