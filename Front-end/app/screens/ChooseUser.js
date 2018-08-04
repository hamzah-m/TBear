import React, { Component } from "react";
import ChooseUserComp from '../components/ChooseUserComp/ChooseUserComp'
import colors from '../data/colors'

/** 
 * Screen for user to choose to sign up as a doctor or a patient
 */
export default class ChooseUser extends Component{

  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors
    },
    headerBackTitle: null,
    headerTitleStyle: {
      color: 'white',
      fontSize: 30
    },
    headerTintColor: 'white',
  }
  render() {
    
    return(
      <ChooseUserComp navigation={this.props.navigation} />
    )
  }
}