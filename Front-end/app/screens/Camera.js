import React, { Component }from "react";
import CameraComp from '../components/CameraComp/CameraComp'
import colors from '../data/colors'

/** 
 * Screen for displaying camera view
 */
export default class Camera extends Component{

    static navigationOptions = {
        headerStyle: {
          backgroundColor: colors
        },
        headerBackTitle: null,
        headerTitleStyle: {
          color: 'white',
          fontSize: 30
        },
        title: 'Camera',
        headerTintColor: 'white',
      }

    render() {
        return(
            <CameraComp navigation={this.props.navigation} />
        )
    }
};
