

const INITIAL_STATE = {
    name: null,
    email: '',
    occupation:null,
    city:null,
    country:null,
    password:'',
    image:null,
    loadingButtonLogin: false,
    loadingButtonRegister: false,
    loginErro: '',
    registerErro: ''
}
export default(state = INITIAL_STATE, action) =>{
    console.log(action)
    if(action.type == 'modifyName'){
        return{...state, name: action.payload}}
    
    if(action.type == 'modifyEmail'){
        return{...state, email : action.payload}}

    if(action.type == 'modifyPassword'){
        return{...state, password: action.payload }} 
    
    if(action.type == 'modifyCity'){
        return{...state, city: action.payload}}

    if(action.type == 'modifyCountry'){
        return{...state, country: action.payload}}
    
    if(action.type == 'modifyOccupation'){
        return{...state, occupation: action.payload}}
      
    if(action.type == 'LoginButtom'){
        return{...state, loadingButtonLogin: true }}

    if(action.type == 'LoginErro'){
        return{...state, loadingButtonLogin: false, loginErro: action.payload}} 

    if(action.type == 'LoginSucess'){
        return{...state, loadingButtonLogin: false}}
    
    if(action.type == 'LoadingButtonRegister'){
        return{...state, loadingButtonRegister: true}}

    if(action.type == 'RegisterError'){
        return{...state, loadingButtonRegister: false, registerErro: action.payload}}
    
    if(action.type == 'CreateUserSucess'){
        return{...state, loadingButtonRegister: false, name:'',email:'', registerErro:'',password:'',city:'',occupation:'',country:'', image: null, registerErro:''}
    }
    if(action.type == 'LognOutSucess'){
        return{...state, email:'',password:''}
    }
    if(action.type == 'modifyImage'){
        return{...state, image: action.payload}
    }
    if(action.type == 'erroDataUser'){
        return{...state, registerErro: action.payload}

    }

    return state
}