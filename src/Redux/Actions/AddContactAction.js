import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import ReduxThunk from 'redux-thunk'
import base64 from 'base-64'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'


export const ModifyEmail = text =>{
    return{
        type: 'Modifyemail',
        payload: text
    }
}
export const SendDataContact = ({emailContact, email})=>{
    return dispatch =>{
        
        if(email === emailContact){
            return null
        } else{
            dispatch({type: 'LoadButtonSucess'})
                let emailb4 = base64.encode(email)
                    let emailUserb4 = base64.encode(emailContact)

                        firebase.database().ref('Users').child('UserSpace').child(emailUserb4)
                            .once('value')
                                .then(snapshot=>{
                                    if(snapshot.val()){
                                        let Contact = _.values(snapshot.val())
                                        let MyContact = Contact.map(function(element){
                                            return element
                                        })
                                        let { name, email, occupation, city, country } = MyContact[0]
                                    
                                        firebase.database().ref('Users').child('UserSpace').child(emailb4).child('Contact').child(emailUserb4).set({
                                            name,
                                            email,
                                            occupation,
                                            city,
                                            country
                                        })
                                            .then(()=>{
                                                firebase.database().ref('Users').child('UserSpace').child(emailb4)
                                                    .once('value')
                                                        .then(snapshot=>{
                                                            let DataUser = _.values(snapshot.val())
                                                            let Mydata = DataUser.map(function(elements){
                                                                return elements
                                                            })
                                                            let { name , email, occupation, city, country } = Mydata[0]

                                                            firebase.database().ref('Users').child('UserSpace').child(emailUserb4).child('Contact').child(emailb4).set({
                                                                name,
                                                                email,
                                                                occupation,
                                                                city,
                                                                country
                                                            })
                                                        })
                                            })
                                            .then(()=> SendSucess(dispatch)) 
                                                .catch(erro=> SendError(erro,dispatch))   
                                    }else{
                                        dispatch({
                                            type: 'SendError',
                                            payload: 'Usuário não está cadastrado no Space'
                                        })
                                    }
                                }) 
        }
                            
   }
}
const SendSucess = dispatch =>{
    dispatch({
        type: 'SendSucess'
    })
    Actions.pop()
}
const SendError = (erro,dispatch)=>{
    dispatch({
        type: 'SendError',
        payload: 'Usuário não esta cadastrado no Space'
    })
}
/**
 * 
 * firebase.database().ref('Users').child('UserSpace').child(emailb4).child('Contact').child(emailUserb4).push({
                                            name,
                                            city,
                                            country,
                                            email,
                                            occupation
                                        })

                                        .then(()=> SendSucess(dispatch)) 
                                                .catch(erro=> SendError(erro,dispatch))  
 */