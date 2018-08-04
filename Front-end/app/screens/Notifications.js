import React, { Component } from "react";
import NotificationsComp from '../components/NotificationsComp/NotificationsComp'
import colors from '../data/colors'

/** 
 * Screen for puser's notifications
 */
export default class Notifications extends Component {

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
    return (
      <NotificationsComp navigation={this.props.navigation}/>
    );
  }
}
