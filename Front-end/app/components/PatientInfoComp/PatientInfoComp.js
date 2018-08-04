import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Image, Alert, View, Text } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import UserAvatar  from 'react-native-user-avatar'
import { NavigationActions } from 'react-navigation'
import styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../data/colors'

// Options for the dropdown menu for prognosis
const options = ['Not tuberculosis', 'Make an appointment', 'Take another picture in 24 hours']

/** 
 * Component to display detailed view of doctor's patient's profile and test
 */
export default class PatientInfoComp extends Component {

    constructor(props) {
    super(props)
    this.state = { patients,
                    doctors,
                    isLoading: true,
                    imageURL: ''
                }
    }

    submitResult() {
        Alert.alert(
            'Results submitted!',
            'Your results for ' + this.props.item[0] + " " + this.props.item[1] + " have been submitted",
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'OK', onPress: () => {
                this.props.navigation.dispatch( 
                  NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'PatientsList' })],
                    })
                )       
              }},
            ],
            { cancelable: false }
          )
    }
    
    componentDidMount() {
        var AWS = require('aws-sdk');
        var imagePath = 'tbear-299/'
        if(user == "doctor") {
            imagePath += "patient_" + this.props.item[2] + "_doctor_" + id + ".jpg"
        } else if (user == "patient") {
            imagePath += "patient_" + id + "_doctor_" + this.props.item[2] + ".jpg"
        }
        var s3 = new AWS.S3({accessKeyId:'AKIAIHMLFEDH7672RVXQ', secretAccessKey:'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', region:'us-east-1'});
        var params = {Bucket: 'aub-tbtest', Key: imagePath};
        this.setState({
            imageURL: s3.getSignedUrl('getObject', params)
        })
        
    }

    

    render() {
        console.log("Image URL: " + this.state.imageURL)
        return (
            <View  style={{backgroundColor: 'white', height: '100%'}}>
                <ScrollView>
                    {/* Header section*/}
                    <View style={styles.headerSection}>
                        <UserAvatar size="75" name={this.props.item[0] + " " + this.props.item[1]} color='#00bd86' src={this.props.item.image} />
                        <View>
                            <Text style={[styles.sectionTitle, styles.text]}>{this.props.item[0] + " " + this.props.item[1]}</Text>
                            <Text style={[styles.sectionSubtitle, styles.text]}>
                                {this.props.item[4] == "M" ? "Male" : "Female"}, Born {this.props.item[7]} ({this.props.item[8]})
                            </Text>
                        </View>
                    </View>

                    {/* Visit info section */}
                    <View style={styles.visitSection}>
                        <View >
                            <Text style={[styles.text, styles.label]}>Date of visit: </Text>
                            <Text style={[styles.text, styles.data]}>Visit Date</Text>
                        </View>
                        <View >
                            <Text style={[styles.text, styles.label]}>Time since injection: </Text>
                            <Text style={[styles.text, styles.data]}>2 days, 1 hrs, 21 mins</Text>
                        </View>
                    </View>

                    {/* Without test */}
                    { this.state.imageURL == '' && 
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center'}}>
                            <Text style={{color: '#d95040', fontSize: 30}}>No image added</Text> }
                            <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('Camera')}>
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {/* With test */}
                    { this.state.imageURL != '' && 
                        // Test Section
                        <View>
                            <View style={styles.testSection}>
                                <View style={styles.testSectionTop}>
                                    <Text style={[styles.sectionTitle, styles.text]}>Test</Text>
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons style={styles.icon} name="delete" size={30} color='#d95040' />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.testSectionMid}>
                                {
                                      
                                }
                                    
                                    <Image style={styles.pic} source={{uri: this.state.imageURL}} />
                                    <View>
                                        <Text style={[styles.text, styles.label]}>Size: </Text>
                                        <Text style={[styles.text, styles.data]}>25mm</Text>
                                        <Text style={[styles.text, styles.label, {marginTop: 5}]}>Date of Test: </Text>
                                        <Text style={[styles.text, styles.data]}>15/02/2018</Text>
                                        <Text style={[styles.text, styles.data]}>4:28 PM</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Prognosis section  */}
                            <View style={styles.result} >
                                <Text style={[styles.sectionTitle, styles.text]}>Prognosis</Text>
                                <ModalDropdown 
                                    options={options} 
                                    style={styles.dropdown} 
                                    textStyle={styles.dropdownText} 

                                />
                            </View>
                        </View>
                    }

                </ScrollView>
                { this.props.item.bump != '' &&
                    <View style={{ position: 'absolute', bottom: 0, width: '100%'}}>
                        <TouchableOpacity style={styles.submitButton} onPress={() => this.submitResult()}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}
