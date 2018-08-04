import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Card, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from '../../auth'
import colors from '../../data/colors'


/** 
 * Component to display patient's sign up page
 */
export default class SignUpPatientComp extends Component{

  constructor(props) {
    super(props)
    this.state = {
                    email: '',
                    password: '',
                    confirmPassword: '',
                    token: ''
                }
  }

  signUp() {
    if(this.state.email == '') { // Prevent empty email
      Alert.alert(
        'No email!',
        'Please make sure to enter a valid email address.',
        [
          {text: 'OK', style: 'cancel'},
          
        ],
        
      )
    } else if(this.state.password == "") { // Prevent empty password
      Alert.alert(
        'Invalid password!',
        'Please make sure to enter a valid password.',
        [
          {text: 'OK', style: 'cancel'},
          
        ],
        
      )
    } else if (this.state.confirmPassword == "") { // Prevent not confirming password
      Alert.alert(
        'Password not confirmed!',
        'Please re-type your password to confirm it.',
        [
          {text: 'OK', style: 'cancel'},
          
        ],
        
      )
    } else if(this.state.password != this.state.confirmPassword) { // Preventing confirmed password not matching with password
      Alert.alert(
        'Passwords do not match!',
        'Please make sure the passwords you have entered match.',
        [
          {text: 'OK', style: 'cancel'},
          
        ],
        
      )
    } else if(this.state.token.length != 4) { // Preventing confirmed password not matching with password
      Alert.alert(
        'Invalid token!',
        'Please make sure to enter a 4-digit token.',
        [
          {text: 'OK', style: 'cancel'},
          
        ],
        
      )
    } else {  // Confirms that the 4-digit token is valid, otherwise patient won't be able to sign in

      return fetch('https://rfhh9po34d.execute-api.us-east-1.amazonaws.com/token', {
        method: 'POST',
        body: JSON.stringify({
          "request": {
            "type": "delete",
            "token": this.state.token
          }
        }),
      }
      ).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson == "success") { // If token was succesfully deleted, then it is a valid tokens
          return fetch('https://giereaqd0e.execute-api.us-east-1.amazonaws.com/forgot', { // Sign up patient
            method: 'POST',
            body: JSON.stringify({
              "request": {
                  "type": "signUpPatient",
                "email": this.state.email,
                "password": this.state.password
              }
            }),
          }
          ).catch((error) =>{ console.error(error) });
          onSignIn().then(() => {
            user = "patient"
            this.props.navigation.navigate("PatientSignedIn")
          })
        } else { // Not a real token used
          Alert.alert(
            'Invalid token!',
            'Please make sure to enter a valid 4-digit token.',
            [
              {text: 'OK', style: 'cancel'},
              
            ],
            { cancelable: false }
          )
        }        
      })
      .catch((error) =>{
        console.error(error);
      }); 
    }
  }


  render() {
    return(
      <View style={{ justifyContent: 'center', height: '100%', backgroundColor: 'white' }}>
        <Card>
          <FormLabel >Email</FormLabel>
          <FormInput keyboardType="email-address" placeholder="Enter your email address" onChangeText={(text) => this.setState({email:text})} />
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry placeholder="Enter your password" onChangeText={(text) => this.setState({password:text})} />
          <FormLabel>Confirm Password</FormLabel>
          <FormInput secureTextEntry placeholder="Re-enter your password" onChangeText={(text) => this.setState({confirmPassword:text})} />
          <FormLabel>Token</FormLabel>
          <FormInput keyboardType="numeric" placeholder="Enter Token" onChangeText={(text) => this.setState({token:text})} />
          
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity 
            style={{backgroundColor: colors, marginTop: 20, padding: 10, width: '87%'}}
            onPress={() => { this.signUp() }}>
              <Text style={{fontWeight: 'bold', fontSize: 25, textAlign: 'center', color: 'white'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    )
  }
}