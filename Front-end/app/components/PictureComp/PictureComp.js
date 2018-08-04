import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from './styles'
import colors from '../../data/colors'

/** 
 * Component to display the captured image for review before using it
 */
export default class PictureComp extends Component {

    cancel() {
        this.props.navigation.dispatch( 
            NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Camera'})],
              })
       )
    }
    
    save() {        
        this.props.navigation.dispatch( 
            NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AssignPic', params:{ imageData: this.props.imageData, radius: this.props.radius, x: this.props.x, y: this.props.y }})],
              })
       )
    }

    render() {
        return(
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: this.props.imageData.uri }}/>
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