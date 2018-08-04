import React, { Component }from "react";
import AboutTBComp from '../components/AboutTBComp/AboutTBComp'
import colors from '../data/colors'

/** 
 * Screen for displaying information about Tuberculosis for patients
 */
export default class AddPatient extends Component{

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
    
        return {
          headerStyle: {
            backgroundColor: colors,
          },

          title: 'Add a patient',
          headerTitleStyle: {
              color: 'white',
              fontSize: 30
          },
          headerTintColor: 'white',
        }
      }

    render() {
        return(   
            <AboutTBComp />
        )
    }
};
