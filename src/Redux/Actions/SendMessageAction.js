import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import ReduxThunk from 'redux-thunk'
import base64 from 'base-64'



export const ModifyMessage = text =>{
    return{
        type: 'ModifyMessage',
        payload: text
    }
}

export const SendMessage=({email, emailContact,message})=>{
    console.log('aqui')
    console.log(email, emailContact)
    return dispatch =>{
        let emailb4 = base64.encode(email)
        let emailUserb4 = base64.encode(emailContact)
        firebase.database().ref(`/Users/Message/${emailb4}/${emailUserb4}`).push({
            type: 'Int',
            message: message,
        
        })
        .then(()=>{
            firebase.database().ref(`/Users/Message/${emailUserb4}/${emailb4}`).push({
                type: 'Out',
                message: message,

            })
        })
        .then(()=>{
            dispatch({
                type:'SendSucess'
            })
        })
        
    }
}