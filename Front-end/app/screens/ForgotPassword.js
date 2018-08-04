import React, { Component }from "react";
import ForgotPasswordComp from '../components/ForgotPasswordComp/ForgotPasswordComp'
import colors from '../data/colors'

/** 
 * Screen for sending user resset password link
 */
export default class ForgotPassword extends Component{
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
  }

  render() {
      return(
          <ForgotPasswordComp navigation={this.props.navigation} />
      )
  }
};