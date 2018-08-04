import React, { Component } from 'react'
import PatientsListComp from '../components/PatientsListComp/PatientsListComp'
import colors from '../data/colors'

/** 
 * Screen for doctor's list of patients
 */
export default class PatientsList extends Component {

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
      <PatientsListComp navigation={this.props.navigation}/>
    )
  }
}

