import React, { Component }from "react";
import AddPatientComp from '../components/AddPatientComp/AddPatientComp'
import colors from '../data/colors'

/** 
 * Screen for a doctor to add a patient
 */
export default class AddPatient extends Component{

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
    
        return {
          headerStyle: {
            backgroundColor: colors,
          },

          headerTitleStyle: {
              color: 'white',
              fontSize: 30
          },
          headerTintColor: 'white',
        }
      }

    render() {
        return(
            <AddPatientComp navigation={this.props.navigation}/>
        )
    }
};
