import React, { Component } from "react";
import SettingsComp from '../components/SettingsComp/SettingsComp'
import colors from '../data/colors'

/** 
 * Screen for app settings
 */
export default class Settings extends Component{

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
     <SettingsComp navigation={this.props.navigation} />
    )
  }
}

