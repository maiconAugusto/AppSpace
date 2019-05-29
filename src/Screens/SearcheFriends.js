import React, { Component } from 'react'
import { View, 
         StyleSheet, 
         TextInput, 
         Text, 
         ActivityIndicator, 
         TouchableOpacity } from 'react-native'
import { SearchableFlatList } from 'react-native-searchable-list'
import { connect } from 'react-redux'
import { UsersSpace } from '../Redux/Actions/SearcheUserSpace'
import { Icon, Divider, Avatar } from 'react-native-elements'
import { SendDataContact }  from '../Redux/Actions/AddContactAction'
import { Actions } from 'react-native-router-flux';
import _ from  'lodash'
import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import '@firebase/storage'
import base64 from 'base-64'


 export  class SearcheFriends extends Component{
     constructor(props){
         super(props)
         this.state={
            data: [],
            searchTerm: "",
            searchAttribute: 'occupation',
            ignoreCase: true,
            loading: false,
            photo: null,
            emailContact:''
         }
     }

    componentWillMount(){
        this.setState({loading: true})
            //Recovering users
            firebase.database().ref('Users').child('UserSpace').child('UsersOccupation').child('User')
                .on('value',snapshot =>{
                    let UserSpace = _.values(snapshot.val()).map(function(e){
                        return e
                    })
                        this.setState({data: UserSpace , loading: false})
                })  
    }
       
    AddContact(item){
        const email = this.props.email
        const emailContact = item
        this.props.SendDataContact({emailContact, email})
    }
    Rende(item){
        if(this.state.loading){
            return(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator style={{alignItems:'center',justifyContent:'center'}} size = 'large' color = '#2DBE5F'/>
                </View>
            )
        }
        return(
            <View style={{marginTop: 2, marginBottom: 2}}>
                <View style={{backgroundColor:'white',padding: 10,flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=> Actions.contact_Data_2({Date: item}) } >
                                <View style={{flexDirection:'column'}}>
                                    <Text style={stylo.contact} >{item.name}</Text>
                                    <Text style={stylo.contactOccupation} >{item.occupation}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> this.AddContact(item.email)}>
                                <Icon style={{justifyContent:'flex-end'}} name = 'person-add' size={30}/>
                            </TouchableOpacity>  
                </View>
                    <Divider color = 'black'/>
            </View>
            )
    }
     render(){
        
        const {data,  searchTerm, searchAttribute, ignoreCase } = this.state;
         return(
             <View style={stylo.container}>
                <View style={{flex: 1}}>
                    <TextInput
                    style={{margin: 8}}
                    placeholder = '  Busque um serviço aqui...'
                    placeholderTextColor = 'white'
                    underlineColorAndroid='white'
                    onChangeText={searchTerm=> this.setState({searchTerm})}
                    />
                </View>
                <View style={{flex: 7, backgroundColor:'white'}}>
                <SearchableFlatList 
                    data={data} searchTerm={searchTerm}
                    searchAttribute={searchAttribute} ignoreCase={ignoreCase}
                    renderItem={({ item }) => this.Rende(item)}
                    keyExtractor={(item,index)=> index.toString()}
                    />
                </View>
             </View>
         )
     }
 }
 const mapStateToProps = state=>({
    users: state.SearcheFriendsReducer.users,
    email: state.AuthenticReducer.email
 })
 export default connect(mapStateToProps,{UsersSpace, SendDataContact})(SearcheFriends)

 const stylo = StyleSheet.create({
     container:{
         flex: 1,
         backgroundColor:'#2DBE5F'
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
 })
 /**
  *                 <FlatList
                    data={this.props.users}
                    renderItem={({item})=> this.Rende(item)}
                    keyExtractor={(item,index)=> index.toString() }
                    />
  */

 