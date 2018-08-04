import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles'
import colors from '../../data/colors'

/** 
 * Component to display the user's notifications
 */
export default class NotificationsComp extends Component {
    render() {
        return(
            <View style={{backgroundColor: 'white', flex: 1}}>
                <FlatList
                keyExtractor= {(item, index) => index.toString()}
                data={patients}
                renderItem={({item}) => (
                <View style={[styles.listItem, item.seen ? {opacity: 0.3} : '']}>
                    <View style={{width: '70%'}}>
                        <Text style={styles.title}>You just got the results back from {item.name}</Text>
                        <Text style={styles.subtitle}>10/02/2018 - 11:00 AM</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}onPress={ () => { this.props.navigation.navigate('PatientInfo', {item}) }} >
                            <Text style={styles.buttonText}>Check</Text>
                            <Text style={styles.buttonText}>Results</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
                />
            </View>
        )
    }
}
