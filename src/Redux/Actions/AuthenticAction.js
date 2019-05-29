import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import '@firebase/storage'
import ReduxThunk from 'redux-thunk'
import base64 from 'base-64'
import { Actions } from 'react-native-router-flux';
import RNfetchBlob from 'react-native-fetch-blob'

window.XMLHttpRequest = RNfetchBlob.polyfill.XMLHttpRequest
window.Blob = RNfetchBlob.polyfill.Blob

export const ModifyName = text =>{
    return{
        type : 'modifyName',
        payload: text
    }
}

export const ModifyEmail = text =>{
    return{
        type: 'modifyEmail',
        payload: text
    }
}

export const ModifyPassword = text =>{
    return{
        type: 'modifyPassword',
        payload: text
    }
}
export const ModifyCity = text =>{
    return{
        type: 'modifyCity',
        payload: text
    }
}
export const ModifyOccupation = text =>{
    return{
        type: 'modifyOccupation',
        payload: text
    }
}
export const ModifyCountry = text =>{
    return{
        type: 'modifyCountry',
        payload: text
    }
}
export const ModifyImage = text =>{
    return{
        type: 'modifyImage',
        payload: text
    }
}

                //* Authentic User *//
export const AuthenticUser = ({email, password})=>{
    
    return dispatch =>{
        dispatch({type: 'LoginButtom'})
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => LoginSucess(dispatch))
                    .catch(erro =>LoginErro(erro,dispatch))       
    }
}

const LoginSucess = dispatch =>{
    dispatch({
        type: 'LoginSucess'
    })
    Actions.contact()
}

const LoginErro = (error, dispatch)=>{
    dispatch({
        type: 'LoginErro',
        payload: `:( \nInsira um endereço de email válido`
    })
}

                //* Create User in Firebase *///
export const RegisterUser = ({ name, email, password, city, country, occupation, photo})=>{
    return dispatch =>{
        if(name === null || email === null || city === null || country === null || occupation === null || photo === null){
            dispatch({ type: 'erroDataUser',
                       payload:'Todos os campos devem ser preenchidos'
                    })
        }
        else{
            dispatch({type: 'LoadingButtonRegister'})
                let emailb4 = base64.encode(email)
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(user=>{

                            let nameUser = name.toUpperCase()
                            let cityUser = city.toUpperCase()
                            let countryUser = country.toUpperCase()
                            let occupationUser = occupation.toUpperCase()

                            firebase.database().ref('Users').child('UserSpace').child(emailb4).push({
                                
                                name: nameUser,
                                email: email,
                                city: cityUser,
                                country: countryUser,
                                occupation: occupationUser

                            }).then(user=>{
                                firebase.database().ref('Users').child('UserSpace').child('UsersOccupation').child('User').push({
                                    
                                    name: nameUser,
                                    email: email,
                                    city: cityUser,
                                    country: countryUser,
                                    occupation: occupationUser
                                })
                                .then(()=>{
                                    
                                    const image = firebase.storage().ref('Users').child('UsersSpace').child(emailb4).child('image.jpeg')
                                    const mime = 'image.jpeg'
                                    RNfetchBlob.fs.readFile(photo,'base64')
                                        .then((data)=>{
                                            return RNfetchBlob.polyfill.Blob.build(data,{type: mime + ';BASE64'})
                                        })
                                            .then((blob)=>{
                                                image.put(blob,{contentType: mime})
                                                    .then(()=>{
                                                        blob.close()
                                                    })
                                                        .then(()=>{
                                                            console.log('sucess image')
                                                        })
                                                            .catch(()=>{
                                                                console.log('Error image')
                                                            })
                                            })
                                })
                            })
                                        CreateUserSucess(dispatch)})
                                            .catch(erro=> CreateUserError(erro,dispatch))
        }
            
    }
}

const CreateUserSucess = dispatch =>{
    dispatch ({
        type: 'CreateUserSucess',
    })
    Actions.login()
}

const CreateUserError  = (erro, dispatch)=>{
    dispatch({
        type: 'RegisterError',
        payload: `É necessário um endereço de email válido \n e uma senha de 6 digitos.`
    })
}

export const Logout = ()=>{
    return dispatch=>{
        firebase.auth().signOut()
                .then(user=>{
                    console.log('Saiu')
                    Actions.pop()
                    dispatch({
                        type:'LognOutSucess'
                    })
                }).catch(error=>{
                    console.log('nao saiu')})
    }
}