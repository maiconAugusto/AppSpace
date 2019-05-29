import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { SendMessage } from '../Redux/Actions/SendMessageAction'
import { Icon } from 'react-native-elements'


export  class ButtonSend extends Component{
    Send(){

        const message = this.props.Mensage
        const email = this.props.emailU
        const emailContact = this.props.emailCo

        this.props.SendMessage({email,emailContact,message})
    }
    render(){
        return(
            <View>
                <TouchableOpacity onPress={()=> this.Send()} >
                    <Icon name = 'send'
                    size = {30}
                    color = '#2DBE5F'
                    containerStyle={{backgroundColor:'white',marginLeft:8, padding: 10, borderRadius:38}}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}
export default connect(null,{SendMessage})(ButtonSend)