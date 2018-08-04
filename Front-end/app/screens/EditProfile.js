import React, { Component } from "react";
import EditProfileComp from '../components/EditProfileComp/EditProfileComp'
import colors from '../data/colors'

/** 
 * Screen for user to edit his/her profile
 */
export default class EditProfile extends Component {

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
        <EditProfileComp navigation={this.props.navigation}/>
    )
  }
}
