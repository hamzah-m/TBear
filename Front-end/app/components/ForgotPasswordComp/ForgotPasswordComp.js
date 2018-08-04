import React, { Component } from "react";
import { View, TouchableOpacity, Text, Alert} from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import styles from './styles'
import colors from '../../data/colors'

/** 
 * Component for user to input email to send password reset link
 */
export default class ForgotPasswordComp extends Component {
    constructor(props) {
        super(props)
        this.state = { email: '' }
    }

      sendEmail() {
        if(this.state.email == '') {

        }
      }

      render() {
        return(
          <View style={styles.container}>
            <Card style={{ justifyContent: 'center' }} >
              <FormLabel>Enter an email address to send password reset link:</FormLabel>
              <FormInput keyboardType="email-address" placeholder="Email address" onChangeText={(text) => this.setState({email: text})}/>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={() => this.sendEmail()}>
                  <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
              </View>
              
            </Card>
          </View>
        )
      }
  }

  