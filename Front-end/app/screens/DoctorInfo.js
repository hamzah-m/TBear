import React, { Component } from 'react'
import DoctorInfoComp from '../components/DoctorInfoComp/DoctorInfoComp'
import colors from '../data/colors'

/** 
 * Screen for detailed patient's doctor's file and test
 */
export default class DoctorInfo extends Component {
  
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
        <DoctorInfoComp item={this.state.item} navigation={this.props.navigation}/>
      )
    }
  }
  