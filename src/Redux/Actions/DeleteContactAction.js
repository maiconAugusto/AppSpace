import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import ReduxThunk from 'redux-thunk'
import base64 from 'base-64'
import { Actions } from 'react-native-router-flux';

export const DeteleContact = ({email, emailContact})=>{
    console.log(emailContact)
    return dispatch =>{
        let emailb4 = base64.encode(email)
        let emailUserb4 = base64.encode(emailContact)

            firebase.database().ref('Users').child('UserSpace').child(emailb4).child('Contact').child(emailUserb4).remove()
                .then(()=>{
                    firebase.database().ref('Users').child('UserSpace').child(emailUserb4).child('Contact').child(emailb4).remove()
                })
                    .then(user=>{
                        DeteleContactSucess(dispatch)})
                            .catch(erro =>{
                                DeteleContactError(erro,dispatch)
                            })
    }
}
const DeteleContactSucess = dispatch=>{
    dispatch({
        type: 'sucess'
    })
    Actions.pop()
}
const DeteleContactError = (error, dispatch)=>{
    dispatch({
        type: 'Error'
    })
}