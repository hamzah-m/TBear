import React, { Component } from "react";
import SignUpPatientComp from '../components/SignUpPatientComp/SignUpPatientComp'
import colors from '../data/colors'

/** 
 * Screen for patient's sign up
 */
export default class SignUpPatient extends Component{

  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors
    },
    title: 'Patient',
    headerTitleStyle: {
      color: 'white',
      fontSize: 30
    },
    headerTintColor: 'white',
  }

  render() {
    return(
      <SignUpPatientComp navigation={this.props.navigation} />
    )
  }
}