import React, { Component } from 'react'
import { View, 
         Text, 
         StyleSheet, 
         TextInput, 
         TouchableOpacity, 
         ActivityIndicator, 
         ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { ModifyEmail,
         ModifyName, 
         ModifyPassword, 
         RegisterUser,
         ModifyCity,
         ModifyCountry,
         ModifyOccupation,
         ModifyImage
        } from '../Redux/Actions/AuthenticAction'
import { Avatar } from 'react-native-elements';
import  ImagePicker from 'react-native-image-picker'


class Register extends Component{
    constructor(props){
        super(props)
            this.state={
                photo: null
            }
    }
    
    // Sending user data
    SendCreateUser(){
       let name = this.props.name
       let email = this.props.email
       let password = this.props.password
       let country = this.props.country
       let city = this.props.city
       let occupation = this.props.occupation
       let photo = this.props.image
       // Sending user data 
       this.props.RegisterUser({name, email, password,city, country, occupation, photo})
    }
    // tirando foto do usuário
    TakePhoto(){
        let Options ={
            title: 'Escolha a foto'
        }
        ImagePicker.showImagePicker(Options,(response)=>{
            if(response.uri){
                let uris = {uri : response.uri}
                this.setState({photo: uris})
                let uri = response.uri.replace('file://', '')
                this.props.ModifyImage(uri)
            }
        })
    }
    Buttom(){
       if(this.props.loadingButtonRegister){
        return(
        <View style={stylo.button}>
            <ActivityIndicator size = 'large' color = 'white'/>
        </View>
           )
       }
       return(
        <View style={stylo.button}>
            <TouchableOpacity style={stylo.acess} onPress={()=> this.SendCreateUser()} >
                <Text style={stylo.textAcess}>Cadastrar</Text>
            </TouchableOpacity> 
        </View>
       )
    }
    render(){
        return(
            <ScrollView style={stylo.container}>
                <View style={stylo.header}>
                            <Avatar 
                                    rounded
                                    title='Photo'
                                    titleStyle={{fontSize:12}}
                                    size='medium' 
                                    icon={{ name: 'user'}}
                                    onPress={()=> this.TakePhoto()}
                                    source={this.state.photo}
                                    />
                </View>
                <View style={stylo.textInput}>
                    <TextInput
                    placeholder = 'Name:'
                    placeholderTextColor = 'white'
                    underlineColorAndroid = 'white'
                    maxLength={22}
                    onChangeText={(text)=> this.props.ModifyName(text)}
                    />
                    <TextInput
                    placeholder = 'Profissão:'
                    placeholderTextColor = 'white'
                    underlineColorAndroid = 'white'
                    maxLength={30}
                    onChangeText={(text)=> this.props.ModifyOccupation(text)}
                    />
                    <TextInput
                    style={{width:150}}
                    placeholder = 'Cidade:'
                    placeholderTextColor = 'white'
                    underlineColorAndroid = 'white'
                    onChangeText={(text)=> this.props.ModifyCity(text)}
                    />
                    <TextInput
                    style={{width:150}}
                    placeholder = 'Estado:'
                    placeholderTextColor = 'white'
                    underlineColorAndroid = 'white'
                    onChangeText={(text)=> this.props.ModifyCountry(text)}
                    />
                    <TextInput
                    placeholder = 'E-mail:'
                    placeholderTextColor = 'white'
                    underlineColorAndroid = 'white'
                    onChangeText={(text)=> this.props.ModifyEmail(text)}
                    />
                    <TextInput
                    placeholder = 'Password:'
                    placeholderTextColor = 'white'
                    secureTextEntry
                    underlineColorAndroid = 'white'
                    onChangeText={(text)=> this.props.ModifyPassword(text)}
                    />
                    <Text style={{color: 'red', textAlign:'center',alignItems:'center'}}>{this.props.registerErro}</Text>
                </View>
                {this.Buttom()}
            </ScrollView>
        )
    }
}
const mapStateToProps = state =>({
    name: state.AuthenticReducer.name,
    email: state.AuthenticReducer.email,
    password: state.AuthenticReducer.password,
    city: state.AuthenticReducer.city,
    occupation: state.AuthenticReducer.occupation,
    country: state.AuthenticReducer.country,
    image: state.AuthenticReducer.image,
    loadingButtonRegister: state.AuthenticReducer.loadingButtonRegister,
    registerErro: state.AuthenticReducer.registerErro
})

export default connect(mapStateToProps,{ModifyEmail,
                                         ModifyName, 
                                         ModifyPassword,
                                         ModifyCity,
                                         ModifyCountry,
                                         ModifyOccupation,
                                         ModifyImage, 
                                         RegisterUser})(Register)

const stylo = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#2DBE5F'
    },
    header:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10

    },
    textHeader:{
        textAlign: 'center',
        alignItems:'center',
        fontSize: 36,
        fontWeight: '800',
        color: 'white'
    },
    textInput:{
        flex: 3,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 10
    },
    button:{
        flex: 1,
    },
    acess:{
        alignItems: 'center',
        textAlign:'center',
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 8,
        marginRight: 8
    },
    textAcess:{
        fontWeight:'600',
        color: '#2DBE5F',
        fontSize: 20
    },




})