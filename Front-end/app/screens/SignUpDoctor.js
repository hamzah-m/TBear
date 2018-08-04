import React, { Component } from "react";
import SignUpDoctorComp from '../components/SignUpDoctorComp/SignUpDoctorComp'
import colors from '../data/colors'

/** 
 * Screen for doctor's sign up
 */
export default class SignUpDoctor extends Component{

  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors
    },
    title: 'Doctor',
    headerTitleStyle: {
      color: 'white',
      fontSize: 30
    },
    headerTintColor: 'white',
    backTitle: ''
  }

  render() {
    return(
      <SignUpDoctorComp navigation={this.props.navigation} />
    )
  }
}