import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import UserAvatar  from 'react-native-user-avatar'
import styles from './styles'
import colors from '../../data/colors'

/** 
 * Component to display the user's profile and can edit any of his/her attributes
 */
export default class ProfileComp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            office: '',
            email: '',
            contactNumber: '',
            dob: ''
        }
    }

    cancel() {
        this.props.navigation.dispatch( 
            NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Settings' })],
              })
       )
    }

    save() {
        this.props.navigation.dispatch( 
            NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Settings' })],
              })
       )
    }
  
    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                {/* Doctor's profile */}
                { user == 'doctor' &&
                    <View>
                        <View style={styles.body}>
                            <View style={styles.avatar}>
                                <UserAvatar  size="100" name="chocolate" color='deepskyblue' src={doctors[0].image} />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput style={styles.textInput} value={doctors[0].name} onChangeText={(text) => this.setState({name:text})}/>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Office</Text>
                                <TextInput style={styles.textInput} value={doctors[0].office} onChangeText={(text) => this.setState({office:text})}/>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Number/Ext</Text>
                                <TextInput style={styles.textInput} value={doctors[0].contactNumber} onChangeText={(text) => this.setState({contactNumber:text})}/>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput style={styles.textInput} value={doctors[0].email} onChangeText={(text) => this.setState({email:text})}/>
                            </View>
                        </View>
                    </View>
                    }

                    {/* Patient's profile */}
                    { user == 'patient' &&
                        <View>
                            <View style={styles.body}>
                                <View style={styles.avatar}>
                                    <UserAvatar  size="100" name="chocolate" color={colors} src={patients[0].image} />
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Name</Text>
                                    <TextInput style={styles.textInput} value={patients[0].name} onChangeText={(text) => this.setState({name:text})}/>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Date of Birth</Text>
                                    <TextInput style={styles.textInput} value={patients[0].dob} onChangeText={(text) => this.setState({dob:text})}/>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Number</Text>
                                    <TextInput style={styles.textInput} value='03/656-928' onChangeText={(text) => this.setState({contactNumber:text})}/>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput style={styles.textInput} value='example@gmail.com' onChangeText={(text) => this.setState({email:text})}/>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Gender</Text>
                                    <TextInput style={styles.textInput} value={patients[0].gender} onChangeText={(text) => this.setState({email:text})}/>
                                </View>
                            </View>
                        </View>
                    }
                </ScrollView>
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => this.cancel()}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.save]} onPress={() => this.save()}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) 
    }
  }

  