import React, { Component } from 'react'
import { View,
         Text,
         StyleSheet,
         FlatList, 
         ScrollView, 
         TouchableOpacity ,
         ActivityIndicator } from 'react-native'

import { Avatar,
         Divider,
         Icon } from 'react-native-elements'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import base64 from 'base-64'
import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import '@firebase/storage'
import _ from 'lodash'
import { Logout } from '../Redux/Actions/AuthenticAction'
import { UsersSpace } from '../Redux/Actions/SearcheUserSpace'

class Contact extends Component{
        constructor(props){
            super(props)
            this.state = {
                contact: [],
                loading: false
            }
        }
        componentWillMount(){
        this.setState({loading: true})
            // Recovering user email
            const user = firebase.auth().currentUser.email
                let emailb4 = base64.encode(user)
                    //Recovering contacts
                    firebase.database().ref('Users').child('UserSpace').child(emailb4).child('Contact')
                        .on('value', snapshot =>{
                            snapshot.val()
                                let  data = _.values(snapshot.val())
                                    data.sort(function(a,b){
                                        return(a.name > a.name)? 1: ((b.name > a.name) ? -1 : 0)
                                    })
                                        this.setState({ contact: data, loading: false})
                        })                             
        }                 
        Contacts(item){
            return(
                    <ScrollView>
                            <View style={{marginTop: 2, marginBottom: 2}}>
                                <View style={{alignItems:'center',justifyContent:'space-between',flexDirection:'row',backgroundColor:'white',padding: 10}}>
                                        <TouchableOpacity onPress={()=> Actions.contactData({Date: item})} style={{flexDirection:'row'}}>
                                            <View style={{flexDirection:'column'}}>
                                                <Text style={stylo.contact}>{item.name}</Text>
                                                <Text style={stylo.contactOccupation}>{item.occupation}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=> Actions.messageContact({Date: item})}>
                                            <View style={{padding:16, backgroundColor:'#2DBE5F', borderRadius: 45}}>
                                                    <Icon name ='chat-bubble' color = 'white'/>
                                            </View>
                                        </TouchableOpacity>
                                </View>
                                        <Divider color = 'black'/>
                            </View>
                    </ScrollView>
            )
        }
        // Exit app
        SignOut(){
            this.props.Logout()
        }

        Flatlist(){
            if(this.state.loading){
                return(
                <View style={{flex: 9,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator style={{alignItems:'center',justifyContent:'center'}} size = 'large' color = '#2DBE5F'/>
                </View>
                )
            }
            return(
                <View style={stylo.contacts}>
                    <FlatList data={this.state.contact}
                     renderItem={({item})=> this.Contacts(item)}
                     keyExtractor={(item,index)=> index.toString()}
                     />
                </View>
            )
        }
    render(){
        return(
            <View style={stylo.container}>
                <View style={stylo.header}>
                    <View style={{flexDirection:'row',justifyContent:'space-between', marginLeft:8, marginRight:8}}>
                    <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity
                                onPress={()=> {Actions.searchFriends(),this.props.UsersSpace()}}>
                                <Icon name = 'public' size = {30} color='#2E2E2E' containerStyle={{ marginRight: 12}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity
                                onPress={()=> Actions.addContact()}>
                                <Icon name = 'person-add' size = {30} color='#2E2E2E' containerStyle={{ marginRight: 12}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity
                                onPress={()=> this.SignOut()}>
                                <Text style={{fontWeight:'bold',marginRight:6, marginTop:6, fontSize:18, color: '#2E2E2E'}}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {this.Flatlist()}
                <View style={stylo.end}>
                    <View style={{alignItems:'flex-end',justifyContent:'flex-end', marginBottom: 50}}>    
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state =>({
    email: state.AuthenticReducer.email
})
export default connect(mapStateToProps,{Logout, UsersSpace})(Contact)

const stylo = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    },
    header:{
        flex: 1.0,
        backgroundColor: '#2DBE5F',
        justifyContent: 'center'
    },
    contacts:{
        flex: 9,
    },
    contact:{
        marginTop: 6,
        marginLeft: 10,
        fontStyle: 'normal',
        fontSize: 14,
        color : '#424242',
        fontWeight:'600'
    },
    contactOccupation:{
        marginTop: 2,
        marginLeft: 10,
        fontStyle: 'normal',
        fontSize: 14,
        color : '#2DBE5F',
        fontWeight:'600'
    },
    end:{
        flex: 0.5,
        backgroundColor: '#2DBE5F',
        
    },
})