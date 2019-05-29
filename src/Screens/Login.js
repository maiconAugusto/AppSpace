import React, { Component } from 'react'
import { View, 
         Text, 
         StyleSheet, 
         TextInput, 
         TouchableOpacity,
         StatusBar, 
         Image, 
         ActivityIndicator } from 'react-native'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { ModifyEmail,
         ModifyPassword,
         AuthenticUser } from '../Redux/Actions/AuthenticAction'

const img = require('../Img/space.png')         

class Login extends Component{
    SendEmailandPassword(){
        // Authentic user
        const email = this.props.email
        const password = this.props.password
        this.props.AuthenticUser({email,password})
    }
    Buttom(){
        if(this.props.loadingButtonLogin){
            return(
            <View style={stylo.button} >
                <ActivityIndicator size = 'large' color = '#2DBE5F'/>
            </View> 
            )
        }
            return(
                <View style={stylo.button} >
                    <TouchableOpacity style={stylo.acess}  onPress={()=> {this.SendEmailandPassword()}} >
                        <Text style={stylo.textAcess}>Acessar</Text>
                    </TouchableOpacity>
                </View>
            )
    }
    render(){
        return(
            <View style={stylo.container}>
                <StatusBar backgroundColor = '#2DBE5F' barStyle = 'dark-content' />
                    <View style={stylo.header}>
                        <Image source={img} style={{width:70, height: 70}}/>
                        <Text style={stylo.textHeader}>Space</Text>
                    </View>
                    <View style={stylo.textInput}>
                        <TextInput
                        value={this.props.email}
                        placeholder = 'E-mail'
                        placeholderTextColor = '#2DBE5F'
                        underlineColorAndroid = '#2DBE5F'
                        onChangeText={(text) => this.props.ModifyEmail(text)}
                        />
                        <TextInput
                        value={this.props.password}
                        placeholder = 'Password'
                        placeholderTextColor = '#2DBE5F'
                        secureTextEntry
                        underlineColorAndroid = '#2DBE5F'
                        onChangeText={(text)=> this.props.ModifyPassword(text)}
                        />
                        <TouchableOpacity  
                        onPress={()=> Actions.register()}>
                            <Text style={stylo.register}>Não tem cadastro? Cadastre-se</Text>
                        </TouchableOpacity>
                        <Text style={{color: 'red', textAlign:'center',alignItems:'center'}}>{this.props.loginErro}</Text>
                    </View>
                    {this.Buttom()}
            </View>
        )
    }
}
const mapStateToProps = state =>({
    email: state.AuthenticReducer.email,
    password: state.AuthenticReducer.password,
    loadingButtonLogin: state.AuthenticReducer.loadingButtonLogin,
    loginErro: state.AuthenticReducer.loginErro
})
export default connect(mapStateToProps,{ModifyEmail,ModifyPassword,AuthenticUser})(Login)

const stylo = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white'
    },
    header:{
        flex: 2,
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center'
    },
    textHeader:{
        textAlign: 'center',
        alignItems:'center',
        fontSize: 36,
        fontWeight: '800',
        color: '#2DBE5F'
    },
    textInput:{
        flex: 2,
        marginLeft: 8,
        marginRight: 8,
    },
    button:{
        flex: 1
    },
    acess:{
        alignItems: 'center',
        textAlign:'center',
        backgroundColor: '#2DBE5F',
        padding: 10,
        marginLeft: 8,
        marginRight: 8
    },
    textAcess:{
        fontWeight:'600',
        color: 'white',
        fontSize: 20
    },
    register:{
        fontWeight:'600',
        textAlign: 'center',
        color:'#2DBE5F',
        marginTop: 10
    }


})