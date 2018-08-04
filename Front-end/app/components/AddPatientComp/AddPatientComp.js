import React, { Component } from 'react'
import { ScrollView, Alert, TextInput, TouchableOpacity, ActivityIndicator, View, Text, KeyboardAvoidingView} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { NavigationActions } from 'react-navigation'
import UserAvatar  from 'react-native-user-avatar'
import styles from './styles'
import colors from '../../data/colors'

// Radio buttons used for gender field in form
var radio_props = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
]

/** 
 * Component that displays the add patient form where doctors can add patients by filling in the 
 * required fields. A 4-digit token is generated after successfully adding a patient to the doctor's patients list.
 */

export default class AddPatientComp extends Component {

    constructor(props) {
        super(props)
        this.state = {
                        firstName: 'CJ',
                        lastName: "",
                        gender: '',
                        dob: '',
                        email: '',
                        phoneNumber: 0,
                        dateOfVisit: '', // When the patient visited the doctor
                        age: 0
                    }
    }

     /** 
     * Get date and time when the component first mounts (when the doctor begins adding the patient).
     * This date and time will be used as the date the patient visited the doctor.
     */
    componentDidMount() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();

        if( minutes < 10 ) {
            minutes = "0" + minutes
        }

        var fullDate =  "" + date + '/' + month + '/' + year + ' - '

        if(hours > 12) {
            fullDate += (hours-12) + ':' + minutes + 'PM'
        } else {
            fullDate += hours + ':' + minutes + 'AM'
        }
        this.setState({ dateOfVisit: fullDate })
    }

    // Cancels the last token that was issued in case a mistake was made during filling out patient form
    cancelToken(token) {
        fetch('https://rfhh9po34d.execute-api.us-east-1.amazonaws.com/token', {
        method: 'POST',
        body: JSON.stringify({
            "request": {
            "type": "delete",
            "token": token 
            }
        }),
      }
      ).catch((error) =>{
        console.error("Cancel token error: " + error);
      });
    }


    // Cancels adding a patient and returns user to patients list page
    cancelAddPatient() {
        this.props.navigation.dispatch( 
            NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'PatientsList' })],
            })
        )
    }

    // Dismiss the alert and add the patient to the database
    dismissAndAdd() {
        // Request to add patient to doctor's patients list
        return fetch('https://6fo5juppx2.execute-api.us-east-1.amazonaws.com/rds', {
            method: 'POST',
            body: JSON.stringify({
                "request": {
                "type": "addPatient",
                "params": "",
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "doctorId": id,
                "sex": this.state.gender,
                "birthday": this.state.dob,
                "email": this.state.email,
                "phoneNumber": this.state.phoneNumber,
                "age": this.state.age
                }
            }),
        }
        ).then((response) => response.json())
        .then((responseJson) => {
            
            this.setState({
            isLoading: false,
            dataSource: JSON.parse(responseJson.body),
            });
            // Navigates back to patients list after successfully adding patient to doctor's patients list
            this.props.navigation.dispatch( 
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'PatientsList' })],
                })
            )

        })
        .catch((error) =>{
            console.error("Add patient error " + error);
        });
        
        
    }

   
    /** 
     * Before the patient is actually added and dismissAndAdd() is called, a few checks are made in this function
     * This date and time will be used as the date the patient visited the doctor.
     */
    addPatient() {
        // Making sure that all the fields have been filled
        if(this.state.firstName == "CJ" || this.state.gender == "" || 
           this.state.dob == "" || this.state.phoneNumber == 0 || this.state.email == "") {

            Alert.alert(
                'Incomplete form.',
                'Please make sure to enter all necessary fields.',
                [
                  {text: 'OK', style: 'cancel'},
                ],
              )
        } else {
            // Get the age of the patient from his date of birth
            var year = new Date().getFullYear()
            var age = year-this.state.dob.slice(6)
            this.setState({age: age})

            // Split the name filled out in the form to first and last name.
            var splitName = this.state.firstName.split(" ")
            this.setState({firstName: splitName[0]})
            this.setState({lastName: splitName[1] !== undefined ? splitName[1] : ""})
               

            // Request to get a token
            return fetch('https://rfhh9po34d.execute-api.us-east-1.amazonaws.com/token', {
                method: 'POST',
                body: JSON.stringify({
                    "request": {
                    "type": "generate",
                    "doctorId": id.toString()
                    }
                }),
            }
            ).then((response) => response.json())
            .then((responseJson) => {
                var token = responseJson.body
                Alert.alert(
                    'Token: ' + token,
                    'Give this token to your patient.',
                    [
                    // Go back to form and cancel last token
                    {text: 'Cancel', style: 'cancel', onPress: () => this.cancel(token)}, 
                    // Add patient and go back to patients list page
                    {text: 'OK', onPress: () => this.dismissAndAdd()}, 
                    ],
                    { cancelable: false }
                )
            })
            .catch((error) =>{
                console.error("Token generation error: " + error);
            });
        }   
    }

    render() {
        return (
            <View style={{height: '100%'}}>
                <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
                    <View style={styles.avatar}>
                        <UserAvatar style={styles.avatar} size="90" name={this.state.firstName} color={colors}  />
                    </View>
                    <FormLabel labelStyle={styles.formLabel}>Name</FormLabel>
                    <FormInput inputStyle={styles.formInput} placeholder="Patient's first and last name" onChangeText={
                        (text) => {
                            // To keep default value of first name for UserAvatar name value, else change to given value
                            if(text == '') {
                                this.setState({firstName: 'CJ'})
                            } else {
                                this.setState({firstName:text})
                            }
                        }}/>

                    <FormLabel labelStyle={styles.formLabel}>Date of Birth</FormLabel>
                    <FormInput inputStyle={styles.formInput} placeholder="(DD/MM/YYYY)" onChangeText={(text) => this.setState({dob:text})}/>
                    

                    <FormLabel labelStyle={styles.formLabel}>Email</FormLabel>
                    <FormInput inputStyle={styles.formInput} placeholder="Patient's email" onChangeText={(text) => this.setState({email:text})}/>
                    
                    <FormLabel labelStyle={styles.formLabel}>Phone Number</FormLabel>
                    <FormInput inputStyle={styles.formInput} placeholder="Patient's phone number" onChangeText={(text) => this.setState({phoneNumber:text})}/>
                    

                    <View style={{alignItems: 'center'}}>
                        <RadioForm  
                            labelColor={colors}
                            radio_props={radio_props} 
                            style={styles.radioForm}
                            radioStyle={{paddingRight: 20}}
                            selectedButtonColor={colors}
                            selectedLabelColor={colors}
                            buttonSize={20}
                            formHorizontal={true} 
                            initial={null}
                            labelTextSize={20}
                            buttonColor={colors}
                            onPress={(value) => {this.setState({gender:value})}} 
                        />
                    </View>
                </ScrollView>
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => this.cancelAddPatient()}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.save]} onPress={() => this.addPatient()}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
