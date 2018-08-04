import React, { Component } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from '../../auth'
import colors from '../../data/colors'

/** 
 * Component to display sign in page
 */
export default class SignInComp extends Component{

  constructor(props) {
    super(props)
    this.state = {
                    email: '',
                    password: '',
                    validUser: true
                }
}

  // Check if user signing in is a doctor
  doctorCheck() {
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
        
        if(responseJson.statusCode == "200") { // If request was successful
          this.setState({isLoading: true})
          var doctors = JSON.parse(responseJson.body) // List of all doctors
          doctors.map((doctor) => {
            if(doctor[4] == this.state.email) { // Check if the email entered belongs to a doctor
              return fetch('https://bni7a74mf6.execute-api.us-east-1.amazonaws.com/rds', { // Sign in doctor if password is valid
                method: 'POST',
                body: JSON.stringify({
                  "request": {
                     "type": "doctorLogin",
                    "email": this.state.email,
                    "password": this.state.password
                  }
                }),
              }).then((response) => response.json())
              .then((responseJson) => {
                  if(responseJson.body) {
                    onSignIn().then(() => {
                      user = "doctor" // assign global variable as doctor
                      id = doctor[2] // assign global variable to id of doctor
                      console.log("Doctor ID: " + id)
                      this.props.navigation.navigate("DoctorSignedIn")
                    })
                } else {
                  Alert.alert(
                    'Invalid email and/or password!',
                    'Please make sure to enter a valid credentials.',
                    [
                      {text: 'OK', style: 'cancel'},
                      
                    ],
                  )
                }
              }
              ).catch((error) =>{ console.error(error) });
              
            }
        });
        } else { // Request unsuccessful
          Alert.alert(
            'Network error!',
            'Please make sure you have an active internet connection or try again later.',
            [
              {text: 'OK', style: 'cancel'},
              
            ],
          )
        }
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  // Check if user signing in is a patient
  patientCheck() {
    return fetch('https://6fo5juppx2.execute-api.us-east-1.amazonaws.com/rds', {
      method: 'POST',
      body: JSON.stringify({
        "request": {
          "type": "getAllPatients",
          "params": ""
        }
      }),
    }
    ).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.statusCode == "200") { // Request was successfull
        this.setState({isLoading: true})
        var patients = JSON.parse(responseJson.body)
        patients.map((patient) => {
          if(patient[5] == this.state.email) { // Check if the email entered belongs to a patient
            return fetch('https://bni7a74mf6.execute-api.us-east-1.amazonaws.com/rds', { // Sign in patient if password is valid
              method: 'POST',
              body: JSON.stringify({
                "request": {
                   "type": "patientLogin",
                  "email": this.state.email,
                  "password": this.state.password
                }
              }),
            }).then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.body) {
                onSignIn().then(() => {
                  user = "patient" // assign global variable as patient
                  id = patient[2] // assign global variable to the id of the patient
                  console.log("ID of patient: " + id)
                  this.props.navigation.navigate("PatientSignedIn")
                })
              } else {
                Alert.alert(
                  'Invalid email and/or password!',
                  'Please make sure to enter a valid credentials.',
                  [
                    {text: 'OK', style: 'cancel'},
                    
                  ],
                )
              }
            }
            ).catch((error) =>{ console.error(error) });
          } else {
            this.setState({validUser: false})
          }
      });
      } else { // Request unsuccessfull
        Alert.alert(
          'Network error!',
          'Please make sure you have an active internet connection or try again later.',
          [
            {text: 'OK', style: 'cancel'},
            
          ],
          
        )
      }
      
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  signIn() {

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
    } else {

      // First check: is user signing in is a doctor
      this.doctorCheck()
      
      // Second check: is user signing in a patient
      this.patientCheck()

      //User is neither a doctor nor a patient
      if(!this.state.validUser) {
        Alert.alert(
          'Invalid email and/or password!',
          'Please make sure to enter a valid credentials.',
          [
            {text: 'OK', style: 'cancel'},
            
          ],
        )
      }
      


    }
  }

  render() {
    return(
      <View style={{ justifyContent: 'center', height: '100%', backgroundColor: 'white' }}>
        <Card style={{ justifyContent: 'center' }} >
          <FormLabel>Email</FormLabel>
          <FormInput keyboardType="email-address" placeholder="Email address" onChangeText={(text) => this.setState({email:text})}/>
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry placeholder="Password" onChangeText={(text) => this.setState({password:text})}/>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity 
            style={{backgroundColor: colors, marginTop: 20, padding: 10, width: '87%'}}
            onPress={() => { this.signIn() }}>
              <Text style={{fontWeight: 'bold', fontSize: 25, textAlign: 'center', color: 'white'}}>Sign In</Text>
            </TouchableOpacity>
          </View>
          
          <Button
            backgroundColor="transparent"
            textStyle={{ color: colors }}
            title="Forgot your password?"
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          />
        </Card>
      </View>
    )
  }
}
