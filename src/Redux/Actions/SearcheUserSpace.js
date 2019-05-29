import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import ReduxThunk from 'redux-thunk'
import base64 from 'base-64'
import _ from 'lodash'


export const UsersSpace = ()=>{
    return dispatch =>{
        firebase.database().ref('Users').child('UserSpace').child('UsersOccupation').child('User')
            .on('value',snapshot =>{
                //let data = _.values(snapshot.val())
                console.log(snapshot.val())
                    dispatch({
                        type: 'UsersSpace',
                        payload:  snapshot.val()
                    })
            })

    }
}