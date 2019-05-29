import React, { Component } from 'react'
import { View, 
         StyleSheet, 
         FlatList, 
         Text, 
         TextInput } from 'react-native'
         
import { connect } from 'react-redux'
import {  ModifyMessage} from '../Redux/Actions/SendMessageAction'
import { ReturnMessage } from '../Redux/Actions/ReturnMessageAction'

import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import ButtonSend from '../Components/ButtonSend';

 class MessageContact extends Component{

    componentWillMount(){

        const email = this.props.email
        const emailContact = this.props.Date.email
        this.props.ReturnMessage({email,emailContact})
    }
    Send(){

        const message = this.props.ReceiveMessages
        const email = this.props.email
        const emailContact = this.props.Date.email
        this.props.SendMessage({email,emailContact,message})
    }
    renderRow(item){    
            if(item.type == 'Out'){
                return(
                    <View style={{alignItems: 'flex-start', marginTop: 5,marginBottom:5, marginLeft:8, marginRight: 35}}>
                            <Text style={{fontSize: 18,
                                          paddingRight:22, 
                                          paddingLeft:22, 
                                          paddingTop:8,
                                          paddingBottom:8,
                                          backgroundColor:'#F6CECE',
                                          borderRadius:12,color:'#424242'}}>
                                          {item.message}
                            </Text>
                    </View>
            )}   
                return(
                    <View style={{alignItems: 'flex-end', marginTop: 5,marginBottom:5, marginLeft:35, marginRight: 8}}>
                            <Text style={{fontSize: 18,
                                          paddingRight:18, 
                                          paddingLeft:18, 
                                          paddingTop:8,
                                          paddingBottom:8,
                                          backgroundColor:'#F2F2F2', 
                                          elevation:1,
                                          borderRadius:12,
                                          color:'#424242'}}>
                                          {item.message}
                            </Text>
                    </View>
                )
    }
    render(){
        console.log(this.props.ReceiveMessages)
        return(
           <View style={stylo.container}>

                    <View style={{flex:7}}>
                        <FlatList
                        data={this.props.ReceiveMessages}
                        renderItem={({item})=> this.renderRow(item)}
                        keyExtractor={(item,index)=> index.toString()}
                        inverted
                        />
                    </View>
                    <View style={{flex:1 , backgroundColor:'#2DBE5F'}}>
                        <View style={{flexDirection:'row', paddingTop: 8}}>
                            <TextInput
                            value={this.props.message}
                            placeholder = ' Digite aqui'
                            placeholderTextColor = '#2DBE5F'
                            style={{backgroundColor:'white',borderRadius:20, width:280,height: 50, marginLeft:10,marginBottom:8}}
                            onChangeText={(text)=> this.props.ModifyMessage(text)}
                            />
                            <ButtonSend Mensage={this.props.message}
                                        emailCo={this.props.Date.email}
                                        emailU={this.props.email}
                             />
                            
                        </View>
                    </View>
           </View>
        )
    }
}

const stylo = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})

const mapStateToProps = state =>({
    message: state.SendMessageReducer.message,
    email: state.AuthenticReducer.email,
    ReceiveMessages: state.ReturnMessageReducer.ReceiveMessages,
    loadingMessage: state.ReturnMessageReducer.loadingMessage
})

export default connect(mapStateToProps,{ModifyMessage,ReturnMessage})(MessageContact)