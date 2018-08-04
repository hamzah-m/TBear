import React, { Component }from "react";
import AddDoctorComp from '../components/AddDoctorComp/AddDoctorComp'
import colors from '../data/colors'

/** 
 * Screen for a patient to add a doctor
 */
export default class AddDoctor extends Component{

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
            <AddDoctorComp navigation={this.props.navigation}/>
        )
    }
};
