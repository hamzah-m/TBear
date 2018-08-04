import React, { Component }from "react";
import PictureComp from '../components/PictureComp/PictureComp'
import colors from '../data/colors'

/** 
 * Screen for reviewing image captured by camera
 */
export default class Picture extends Component{
    static navigationOptions = {
        headerStyle: {
          backgroundColor: colors
        },
        headerTitleStyle: {
          color: 'white',
          fontSize: 30
        },
        
        headerTintColor: 'white',
      }

    render() {
        
        return( 
            <PictureComp imageData={this.props.navigation.state.params.imageData} 
                         x={this.props.navigation.state.params.x} 
                         y={this.props.navigation.state.params.y} 
                         radius={this.props.navigation.state.params.radius} 
                         navigation={this.props.navigation}/>
        )
    }
};
