import React, { Component }from "react";
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import colors from '../../data/colors'
import styles from './styles'

/** 
 * Component that displays the add doctor form where patients can input a 4-digit token
 * provided to them by their doctor(s) to add said doctor to their doctors list.
 */

export default class AddDoctorComp extends Component{

    constructor(props) {
        super(props)
        this.state = {
                        token: -1 // Default token value
                    }
    }


    // Add doctor to patient's doctors list
    addDoctor() {
      // If the token given does not consist of 4-digits, then it is not a valid by default
        if(this.state.token.length != 4) { 
            Alert.alert(
                'Invalid token!',
                'Please make sure to enter a valid 4-digit token.',
                [
                  {text: 'OK', style: 'cancel'},
                  
                ],
                
              )
        } else {
            console.log("Doctor added: ", this.state.token.length )
        }
    }

    render() {
        return(
          <View style={styles.container}>
            <Card style={{ justifyContent: 'center' }} >
              <FormLabel>Enter a token to add a new doctor:</FormLabel>
              <FormInput keyboardType="numeric" placeholder="Token" onChangeText={(token) => this.setState({token: token})}/>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={() => this.addDoctor()}>
                  <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        )
      }
};
