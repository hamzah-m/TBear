import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Card, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from '../../auth'
import colors from '../../data/colors'

/** 
 * Component to display doctor's sign up page
 */
export default class SignUpDoctorComp extends Component{

  constructor(props) {
    super(props)
    this.state = {
                    email: '',
                    password: '',
                    confirmPassword: '',
                    isValid: true,
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
    } else {  // Confirms that email belongs to a doctor in our database, then signs him/her up is s/he does

      return fetch('https://6fo5juppx2.execute-api.us-east-1.amazonaws.com/rds', {
        method: 'POST',
        body: JSON.stringify({
          "request": {
            "type": "getAllDoctors",
            "params": ""
          }
        }),
      }
      ).then((response) => response.json())
      .then((responseJson) => {
        var doctors = JSON.parse(responseJson.body) // List of all doctors
        doctors.map((doctor) => {
          console.log(doctor)
            if(doctor[4] == this.state.email) { // If doctor's email belongs in our database
              fetch('https://giereaqd0e.execute-api.us-east-1.amazonaws.com/forgot', { // Sign up doctor
                method: 'POST',
                body: JSON.stringify({
                  "request": {
                     "type": "signUpDoctor",
                    "email": this.state.email,
                    "password": this.state.password
                  }
                }),
              }
              ).catch((error) =>{ console.error(error) });
              onSignIn().then(() => {
                user = "doctor"
                this.props.navigation.navigate("DoctorSignedIn")
              })
            } 
        });
        this.setState({isValid: false})
      })
      .catch((error) =>{
        console.error(error);
      }); 
    }

    // Not a valid email address
    if(!this.state.isValid) {
        Alert.alert(
          'Invalid email!',
          'Please make sure to enter a valid email address.',
          [
            {text: 'OK', style: 'cancel'},
            
          ],
        )  
    }
  }


  render() {
    return(
      <View style={{ justifyContent: 'center', height: '100%', backgroundColor: 'white' }}>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput keyboardType="email-address" placeholder="Enter your email address" onChangeText={(text) => this.setState({email:text})} />
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry placeholder="Enter your password" onChangeText={(text) => this.setState({password:text})}/>
          <FormLabel>Confirm Password</FormLabel>
          <FormInput secureTextEntry placeholder="Re-enter your password" onChangeText={(text) => this.setState({confirmPassword:text})}/>

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