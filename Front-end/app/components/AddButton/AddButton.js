import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from '../../../node_modules/react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles'
import colors from '../../data/colors'

/** 
 * Add button for the UI in patients/doctors list for adding new patients/doctors.   
 */

export default class AddButton extends Component {

    render() {
        // If the user is a doctor, navigate to add patient page.
        if(user == "doctor") {
            return (
                <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('AddPatient')}  } >
                    <MaterialCommunityIcons name="plus" size={50} color='white' />
                </TouchableOpacity>
            )
        // If the user is a patient, navigate to add doctor page.
        } else if(user == "patient") {
            return (
                <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('AddDoctor')}  } >
                    <MaterialCommunityIcons name="plus" size={50} color='white' />
                </TouchableOpacity>
            )
        }
        
    }
}