import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import ReduxThunk from 'redux-thunk'
import base64 from 'base-64'
import _ from 'lodash'


export const ReturnMessage = ({email, emailContact}) =>{
return dispatch=>{
    dispatch({ type: 'LoadingMessage'})
    let emailb4 = base64.encode(email)
    let emailUserb4 = base64.encode(emailContact)
    firebase.database().ref(`/Users/Message/${emailb4}/${emailUserb4}`)
    .on('value',snapshot=>{
        // Convertendo o objeto para um arry
        let Data = _.values(snapshot.val())
            Data.reverse()
            console.log(Data)
                dispatch({
                    type:'ReceiveMessages',
                    payload: Data
                })
    }) 
    } 
    
}

