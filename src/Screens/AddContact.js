import React, { Component } from 'react'
import { View, 
         Text, 
         StyleSheet, 
         TextInput, 
         TouchableOpacity, 
         ActivityIndicator} from 'react-native'

import { connect } from 'react-redux'
import { ModifyEmail, 
         SendDataContact }  from '../Redux/Actions/AddContactAction'


class AddContact extends Component{

    // Sending contact data to the database
    SendContact(){
        const emailContact = this.props.emailContact
        const email = this.props.email
        this.props.SendDataContact({emailContact,email})
    }

    Buttom(){
        if(this.props.loadButtonAddContact){
            return(
                <View style = {{flex: 1}}>
                    <ActivityIndicator size = 'large' color = '#2DBE5F'/>
                </View>
            )
        }
        return(
            <View style = {{flex: 1}}>
                    <TouchableOpacity
                    style={stylo.register} onPress={()=> this.SendContact()}
                    >
                        <Text style={stylo.textRegister}>Salvar</Text>
                    </TouchableOpacity>
            </View>
        )  
    }
    render(){
        return(
            <View style={stylo.container}>
                <View style={stylo.header}>
                <Text style={{color: 'red', textAlign:'center',alignItems:'center'}}>Atenção!</Text>
                    <Text style={{color: 'red', textAlign:'center',alignItems:'center'}}>O Email deve estar cadastrado no SPACE</Text>
                </View>
                <View style={stylo.input}>
                    <TextInput
                    placeholder = 'E-mail'
                    placeholderTextColor = '#2DBE5F'
                    underlineColorAndroid = '#2DBE5F'
                    onChangeText={(text)=> this.props.ModifyEmail(text)}
                    />
                    <Text style={{color: 'red', textAlign:'center',alignItems:'center'}}>{this.props.addContactError}</Text>
                </View>
                    {this.Buttom()}
            </View>
        )
    }
}

const mapStateToProps = state =>({
    email: state.AuthenticReducer.email, 
    name : state.AddContactReducer.name,
    emailContact: state.AddContactReducer.emailContact,
    phoneNumber: state.AddContactReducer.phoneNumber,
    city: state.AddContactReducer.city,
    loadButtonAddContact: state.AddContactReducer.loadButtonAddContact,
    addContactError: state.AddContactReducer.addContactError
})

export default connect(mapStateToProps,{ModifyEmail,
                                        SendDataContact
                                        })(AddContact)


const stylo = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
    },
    header:{
        flex:2,
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        flex : 5,
        justifyContent:'center',
        marginLeft: 8,
        marginRight: 8
    },
    register:{
        alignItems: 'center',
        textAlign:'center',
        backgroundColor: '#2DBE5F',
        padding: 10,
        marginLeft: 8,
        marginRight: 8
    },
    textRegister:{
        fontWeight:'600',
        color: 'white',
        fontSize: 20
    }
})