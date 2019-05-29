import React, { Component } from 'react'
import { View, 
         Text, 
         StyleSheet, 
         TextInput, 
         TouchableOpacity } from 'react-native'

import { Avatar } from 'react-native-elements'
import{ SendEvaluation, Evaluation } from '../Redux/Actions/Evaluation'
import { connect } from 'react-redux'



export  class EvaluationContact extends Component{
    
    SendEvaluationContact(){
        const email = this.props.email
        const emailContact = this.props.Date.email
        const evaluation = this.props.evaluation
        this.props.SendEvaluation({email,emailContact,evaluation})
    }
    render(){
        return(
            <View style={stylo.container}>
                <View style={{flex:3, justifyContent:'center',alignItems:'center'}}>
                    <Avatar
                    rounded
                    size='xlarge'
                    />
                </View>
                <View style={{flex:4, justifyContent:'center'}}>
                    <TextInput
                    style={{marginLeft: 8, marginRight: 8,}}
                    placeholder = 'Digite aqui'
                    placeholderTextColor = 'white' 
                    underlineColorAndroid='white' 
                    onChangeText={(text)=> this.props.Evaluation(text)}  
                    />
                </View>

                <View style={{flex: 1}}>
                    <TouchableOpacity style={stylo.acess} onPress={()=> this.SendEvaluationContact()} >
                        <Text style={stylo.textButton}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state =>({
    evaluation: state.EvalutionReducer.evaluation,
    email: state.AuthenticReducer.email
})

export default connect(mapStateToProps,{SendEvaluation,Evaluation})(EvaluationContact)
const stylo = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#2DBE5F',
    },
    textButton:{
        fontWeight:'600',
        color: '#2DBE5F',
        fontSize: 20
    },
    acess:{
        alignItems: 'center',
        textAlign:'center',
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 8,
        marginRight: 8
    }
})