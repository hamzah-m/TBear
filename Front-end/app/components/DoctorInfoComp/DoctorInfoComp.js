import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Image, View, Text } from 'react-native';
import UserAvatar  from 'react-native-user-avatar'
import styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../data/colors'

/** 
 * Component to display detailed view of patient's doctor's profile and test
 */
export default class DoctorInfoComp extends Component {

    constructor(props) {
        super(props)
        this.state = { patients,
                        doctors,
                        isLoading: true,
                        test: true,
                        imageURL: ''
                    }
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
        return (
            <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
                {/* Header section*/}
                <View style={styles.headerSection}>
                    <UserAvatar size="75" name="Chip Whitley" color='#FB3640' src={this.props.item[0] + " " + this.props.item[1]} />
                    <View>
                        <Text style={[styles.sectionTitle, styles.text]}>{this.props.item[0] + " " + this.props.item[1]}</Text>
                    </View>
                </View>

                {/* Visit info section */}
                <View style={styles.visitSection}>
                    <View >
                        <Text style={[styles.text, styles.label]}>Date of visit: </Text>
                        <Text style={[styles.text, styles.data]}>10/1/2018 - 12:21 AM</Text>
                    </View>
                    <View >
                        <Text style={[styles.text, styles.label]}>Time since injection: </Text>
                        <Text style={[styles.text, styles.data]}>2 days, 1 hrs, 21 mins</Text>
                    </View>
                </View>

                {/* Without test */}
                { this.state.test && 
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center'}}>
                        <Text style={{color: '#d95040', fontSize: 30}}>No image added</Text> }
                        <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('Camera')}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                }

                {/* With test */}
                { this.state.test != '' && 
                    <View>
                        <View style={styles.testSection}>
                            <View style={styles.testSectionTop}>
                                <Text style={[styles.sectionTitle, styles.text]}>Test</Text>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons style={styles.icon} name="delete" size={30} color='#d95040' />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.testSectionMid}>
                                <Image style={styles.pic} source={{uri: this.state.imageURL}} />
                                <View >
                                    <Text style={[styles.text, styles.label]}>Size: </Text>
                                    <Text style={[styles.text, styles.data]}>25mm</Text>
                                    <Text style={[styles.text, styles.label, {marginTop: 5}]}>Date of Test: </Text>
                                    <Text style={[styles.text, styles.data]}>15/02/2018</Text>
                                    <Text style={[styles.text, styles.data]}>4:28 PM</Text>
                                </View>
                            </View>
                        </View>

                        {/* Prognosis section */}
                        <View style={styles.result} >
                            <Text style={[styles.sectionTitle, styles.text]}>Prognosis</Text>
                            <Text style={styles.resultText}>No results yet</Text>
                        </View>
                    </View>
                }

            </ScrollView>
        )
    }
}
