import React, { Component } from 'react'
import DoctorsListComp from '../components/DoctorsListComp/DoctorsListComp'
import colors from '../data/colors'

/** 
 * Screen for patient's list of doctors
 */
export default class DoctorsList extends Component {

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
        <DoctorsListComp navigation={this.props.navigation}/>
    )
  }
}

