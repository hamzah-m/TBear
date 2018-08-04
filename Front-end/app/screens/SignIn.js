import React, { Component } from "react";
import SignInComp from '../components/SignInComp/SignInComp'
import colors from '../data/colors'

/** 
 * Screen for signing in
 */
export default class SignIn extends Component{

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
      <SignInComp navigation={this.props.navigation} />
    )
  }
}
