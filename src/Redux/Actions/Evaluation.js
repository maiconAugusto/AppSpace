import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import ReduxThunk from 'redux-thunk'
import base64 from 'base-64'
import { Actions } from 'react-native-router-flux';


export const Evaluation = text =>{
    return{
        type:'Evaluation',
        payload:text
    }
}

export const SendEvaluation =({email,emailContact,evaluation})=>{
    return dispatch=>{
        let emailb4 = base64.encode(email)
        let emailUserb4 = base64.encode(emailContact)
        firebase.database().ref('Users').child('UserSpace').child(emailUserb4).child('Evaluation').child(emailb4).set({
            evaluation
        })
            .then(()=>{
                SendEvaluationSucess(dispatch)
            })
                .catch(erro=>{
                    SendEvaluationErro(erro,dispatch)
                })
    }
}

const SendEvaluationSucess =(dispatch)=>{
    dispatch({
        type: 'SendSucess',
    })
    Actions.pop()
}
const SendEvaluationErro = (erro,dispatch)=>{
    dispatch({
        type:'SendErro'
    })
}