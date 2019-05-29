import React, { Component } from 'react'
import { View, 
         Text, 
         TextInput, 
         StyleSheet, 
         TouchableOpacity, 
         ActivityIndicator } from 'react-native'

import { ModifyNameContact,
         ModifyOccupation, 
         ModifyCityContact, 
         EditUserDataContact,
         ModifyCountry
        } from '../Redux/Actions/EditUserContactAction'
import { connect } from 'react-redux';


 class EditUserData extends Component{
    // Updating user data
    SendData(){   
        const email = this.props.email
        const name = this.props.name
        const emailContact = this.props.Email.email
        const city = this.props.city
        const occupation = this.props.occupation
        const country = this.props.country
        this.props.EditUserDataContact({email, name, emailContact, occupation, city, country})
    }
    Buttom(){
        if(this.props.loadingButton){
            return(
                <View style = {{flex: 1}}>
                    <ActivityIndicator size = 'large' color = 'white'/>
                </View>
            )
        }
            return(
                <View style = {{flex: 1}}>
                    <TouchableOpacity onPress={()=> this.SendData()}
                        style={stylo.register}
                        >
                        <Text style={stylo.textRegister}>Atualizar</Text>
                    </TouchableOpacity>
                </View>
            ) 
    }
    render(){
        return(
            <View style={stylo.container}>
            <View style={stylo.input}>
                <TextInput
                placeholder = 'Nome'
                placeholderTextColor = 'white'
                underlineColorAndroid = 'white'
                onChangeText={(text)=> this.props.ModifyNameContact(text)}
                />
                <TextInput
                placeholder = 'Profissão'
                placeholderTextColor = 'white'
                underlineColorAndroid = 'white'
                onChangeText={(text)=> this.props.ModifyOccupation(text)}
                />
                <TextInput
                placeholder = 'Cidade'
                placeholderTextColor = 'white'
                underlineColorAndroid = 'white'
                onChangeText={(text)=> this.props.ModifyCityContact(text)}
                />
                <TextInput
                placeholder = 'Estado'
                placeholderTextColor = 'white'
                underlineColorAndroid = 'white'
                onChangeText={(text)=> this.props.ModifyCountry(text)}
                />
                <Text style={{color: 'red', textAlign:'center',alignItems:'center'}}>{this.props.messagerro}</Text>
            </View>
                {this.Buttom()}
        </View>
        )
    }
}
const mapStateToProps = state =>({
    loadingButton: state.EditUserContactReducer.loadingButton,
    email: state.AuthenticReducer.email,
    name: state.EditUserContactReducer.name,
    occupation: state.EditUserContactReducer.occupation,
    city: state.EditUserContactReducer.city,
    country: state.EditUserContactReducer.country,
    messagerro: state.EditUserContactReducer.messagerro
})

export default connect(mapStateToProps,{ ModifyNameContact,
                                         ModifyOccupation, 
                                         ModifyCityContact,
                                         EditUserDataContact,
                                         ModifyCountry
                                        })
                                         (EditUserData)

const stylo = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#2DBE5F'
    },
    input:{
        flex: 8,
        justifyContent:'center',
        marginLeft: 8,
        marginRight: 8
    },
    register:{
        alignItems: 'center',
        textAlign:'center',
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 8,
        marginRight: 8
    },
    textRegister:{
        fontWeight:'600',
        color: '#2DBE5F',
        fontSize: 20
    }
})