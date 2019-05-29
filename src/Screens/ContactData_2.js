import React, { Component } from 'react'

import { View,
         Text,
         StyleSheet,
         FlatList } from 'react-native'

import {  Avatar} from 'react-native-elements';
import { connect } from 'react-redux'
import { DeteleContact } from '../Redux/Actions/DeleteContactAction'
import { ReturnEvalution } from '../Redux/Actions/ReturnEvalution'
import base64 from 'base-64'
import firebase from '@firebase/app'
import '@firebase/storage'


    class ContactData_2 extends Component{
        constructor(props){
            super(props)
                this.state={
                    photo: null
                }
        }
    
    componentWillMount(){
        
        const emailContact = this.props.Date.email
        this.props.ReturnEvalution({emailContact})
        let emailb64 = base64.encode(emailContact)

        // Retrieving user photo
        firebase.storage().ref('Users').child('UsersSpace').child(emailb64).child('image.jpeg')
            .getDownloadURL().then((url)=>{
                let photo = { uri: url}
                    this.setState({photo: photo})
            })
    }
 
    render(){
        console.log(this.props.returnEvalution)
        return(
            <View style={stylo.container}>
                <View style={stylo.dataContact}>
                    <View style={{marginTop:8}}>
                        <Avatar source={this.state.photo} rounded size = 'large'/>
                    </View> 
                    <View style={{flexDirection:'column', paddingLeft:8}}>
                        <Text style={stylo.text}>{this.props.Date.name}</Text>
                        <Text style={stylo.text}>{this.props.Date.occupation}</Text>
                        <Text style={stylo.text}>{this.props.Date.email}</Text>
                        <Text style={stylo.text}>{this.props.Date.city}</Text>
                        <Text style={stylo.text}>{this.props.Date.country}</Text>
                    </View>
                </View>
                <View style={stylo.end}>
                    <Text style={{textAlign:'center'
                                    ,fontSize: 16,
                                    fontWeight:'600',
                                    alignItems:'center',
                                    margin:10,
                                    color:'#424242'
                                    }}>
                                    Avaliações</Text>
                    <FlatList
                    data={this.props.returnEvalution}
                    maxToRenderPerBatch ={5}
                    keyExtractor={(item,index)=> index.toString()}
                    renderItem={({item})=> (
                        <View style={{flexDirection:'column',
                                      marginLeft: 8,
                                      marginRight:8,
                                      marginTop: 8,
                                      marginBottom: 8,
                                      backgroundColor:'#A9F5A9',
                                      borderRadius: 20
                                      }}>
                            <Text style={{marginTop:10,
                                          marginLeft:20,
                                          marginRight:20, 
                                          textAlign:'center',
                                          color:'#424242',
                                          marginBottom:10,
                                          fontWeight:'300',
                                          }}>
                                        " {item.evaluation} "
                            </Text>
                        </View>
                    )}
                    />
                </View>
                <View style={{flex:1, backgroundColor:'#CEF6CE'}}>
                    
                </View>
            </View>
        )
    }
}
const mapStateToProps = state =>({
    email: state.AuthenticReducer.email,
    emailContact: state.DeleteContactReducer.emailContact,
    returnEvalution: state.ReturnEvalutionReducer.returnEvalution
})
export default connect(mapStateToProps,{DeteleContact,ReturnEvalution})(ContactData_2)

const stylo = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
    },
    dataContact:{
        marginTop:25,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-start',
        flex: 2,
        margin: 12
    },
    end:{
        flex: 6,
        backgroundColor:'#CEF6CE',
    },
    text:{
        fontStyle: 'normal',
        fontSize: 14,
        color : '#424242',
        fontWeight:'600'
    },
    textFunction:{
        fontStyle: 'normal',
        fontSize: 20,
        color : '#424242',
        fontWeight:'600'
    },
    valid:{
        fontWeight:'600',
        color: 'white',
        fontSize: 20
    },
    acess:{
        alignItems: 'center',
        textAlign:'center',
        backgroundColor: '#2DBE5F',
        padding: 10,
        marginLeft: 8,
        marginRight: 8
    }
})