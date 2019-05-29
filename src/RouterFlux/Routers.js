import React, { Component } from 'react'
import { Router, Scene, Stack, BackHandler, ActionConst } from 'react-native-router-flux'
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Contact from '../Screens/Contact';
import ContactData from '../Screens/ContactData';
import AddContact from '../Screens/AddContact';
import EditUserData from '../Screens/EditUserData';
import MessageContact from '../Screens/MessageContact'
import SearcheFriends from '../Screens/SearcheFriends';
import EvaluationContact from '../Screens/EvaluationContact';
import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import ContactData_2 from '../Screens/ContactData_2';


export default class Routers extends Component{

    render(){
        return(
            <Router navigationBarStyle={{backgroundColor: '#2DBE5F'}} titleStyle={{color: 'white'}} >
                <Stack key= 'root'>
                    <Scene key='login' component={Login}  hideNavBar={true}  />
                    <Scene key = 'register' component={Register}  hideNavBar={false}/>
                    <Scene key = 'contact' component={Contact} hideNavBar={true} />
                    <Scene key =  'contactData' component={ContactData} hideNavBar={false}/>
                    <Scene key = 'addContact' component={AddContact}  hideNavBar={false}/>
                    <Scene key = 'editUserData' component={EditUserData} hideNavBar = {false}/>
                    <Scene key = 'messageContact' component={MessageContact}  hideNavBar = {false}/>
                    <Scene key = 'searchFriends' component={SearcheFriends} hideNavBar ={false}/>
                    <Scene key = 'evaluationContact' component={EvaluationContact}  hideNavBar={false}/>
                    <Scene key = 'contact_Data_2' component={ContactData_2} hideNavBar={false} />
                </Stack>
            </Router>
        )
    }
}