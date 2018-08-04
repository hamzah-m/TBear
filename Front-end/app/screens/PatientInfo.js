import React, { Component } from 'react'
import PatientInfoComp from '../components/PatientInfoComp/PatientInfoComp'
import colors from '../data/colors'

/** 
 * Screen for detailed doctor's patient's file and test
 */
export default class PatientInfo extends Component {
  
    constructor(props) {
      super(props)
      this.state = {
        item: this.props.navigation.state.params.item
      }
      this.props.navigation.setParams({otherParam: this.state.item.name})
    }
  
    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
  
      return {
        headerStyle: {
          backgroundColor: colors,
        },

        headerTintColor: 'white',

      }
    }
    
    render() {
      
      return (
        <PatientInfoComp item={this.state.item} navigation={this.props.navigation}/>
      )
    }
  }
  