import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import ReduxThunk from 'redux-thunk'
import base64 from 'base-64'
import _ from 'lodash'


export const ReturnEvalution = ({emailContact})=>{
    return dispatch=>{
        let emailUserb4 = base64.encode(emailContact)
        firebase.database().ref('Users').child('UserSpace').child(emailUserb4).child('Evaluation')
            .on('value', snapshot=>{
                let Data = _.values(snapshot.val())
                console.log(Data)

                dispatch({
                    type:'ReturnSucess',
                    payload: Data
                })
            })
                
    }
}