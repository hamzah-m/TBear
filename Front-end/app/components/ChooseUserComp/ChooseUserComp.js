import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import colors from '../../data/colors'
import styles from './styles'

/** 
 * Component displays doctor and patient icon for user to chooose what to sign up as
 */
export default class ChooseUserComp extends Component{

  render() {
    return(
      <View style={styles.container}>
        <Card>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30 }}>

            {/* Doctor icon, leads to sign up for doctor */}
            <View style={{marginRight: 30, alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpDoctor')}>
                <Image style={styles.image} source={require('../../../images/doctor-icon.png')} />
                <Text style={styles.label}>Doctor</Text>
              </TouchableOpacity>
            </View>

            {/* Patient icon, leads to sign up for patient */}
            <View style={{ alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpPatient')}>
                <Image style={styles.image} source={require('../../../images/patient-icon.png')} />
                <Text style={styles.label}>Patient</Text>
              </TouchableOpacity>
            </View> 

          </View>

          <Button
            backgroundColor="transparent"
            textStyle={{ color: colors }}
            style={{marginTop: 30}}
            title="Already have an account?"
            onPress={() => this.props.navigation.navigate("SignIn")}
          />
        </Card>
      </View>
    )
  }
}