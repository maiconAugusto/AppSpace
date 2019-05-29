import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import ReduxThunk from 'redux-thunk'
import { Actions } from 'react-native-router-flux'
import base64 from 'base-64'



export const ModifyNameContact = text =>{
    return{
        type: 'ModifyNameContact',
        payload: text
    }
}

export const ModifyEmailContact = text =>{
    return{
        type:'ModifyEmailContact',
        payload: text
    }
}

export const ModifyOccupation = text =>{
    return{
        type: 'ModifyOccupation',
        payload: text
    }
}

export const ModifyCityContact = text =>{
    return{
        type: 'ModifyCityContact',
        payload: text
    }
}

export const ModifyCountry = text =>{
    return{
        type: 'ModifyCountry',
        payload: text
    }
}


export const EditUserDataContact = ({email, name, emailContact, occupation, city, country}) =>{
    console.log(email, name, emailContact, occupation, city, country)
    return dispatch =>{
        if( name === null  || occupation === null || city === null || country === null){
            dispatch({
                type: 'ErroEditUser',
                payload: 'Todos os campos devem ser preenchidos'
            })
            return null
        } else{
            dispatch({type: 'LoadingButton'})
                let emailb4 = base64.encode(email)
                let emailUserb4 = base64.encode(emailContact)
                    firebase.database().ref('Users').child('UserSpace').child(emailb4).child('Contact').child(emailUserb4).set({
                            name: name,
                            occupation: occupation,
                            city: city,
                            country: country
                            })
                                .then(user=>EditSucess(dispatch))
                                    .catch(erro=>EditErro(erro,dispatch))
        }
    }
}
const EditSucess = dispatch =>{
    dispatch({
        type: 'EditSucess',
        payload: 'Dados salvos com sucesso'
    })
    Actions.pop()
}
const EditErro = (erro, dispatch)=>{
    dispatch({
        type: 'EditError'
    })
}