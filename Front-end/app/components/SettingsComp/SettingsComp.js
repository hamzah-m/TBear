import React, { Component } from "react";
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { onSignOut } from "../../auth";
import colors from '../../data/colors'
import styles from './styles'

/** 
 * Component to display settings of the app
 */
export default class SettingsComp extends Component{

  signOut() {

    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Sign Out', onPress: () => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))},
      ],
      { cancelable: false }
    )
  }
  render() {
    return(
      
      <View style={{ backgroundColor: 'white', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {user == "patient" &&
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("AboutTB")}>
          <Text style={styles.buttonText}>About TB</Text>
        </TouchableOpacity>
        }
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("EditProfile")}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#d95040'}]} onPress={() => this.signOut()}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

