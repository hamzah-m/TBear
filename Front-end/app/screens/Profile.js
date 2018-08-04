import React, { Component } from "react";
import { View, Text } from 'react-native';
import ProfileComp from '../components/ProfileComp/ProfileComp'
import colors from '../data/colors'

/** 
 * Screen for user's profile
 */
export default class Profile extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors
    },
    title: 'TBear',
    headerTitleStyle: {
      color: 'white',
      fontSize: 30
    },
    headerTintColor: 'white',
  }

  render() {
    return(
      <ProfileComp />
    )
  }
}
