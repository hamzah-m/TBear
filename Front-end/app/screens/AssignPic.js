import React, { Component }from "react";
import AssignPicComp from '../components/AssignPicComp/AssignPicComp'
import colors from '../data/colors'

/** 
 * Screen for assigning taken picture to a patient/doctor
 */
export default class AssignPic extends Component{
   
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
            <AssignPicComp imageData={this.props.navigation.state.params.imageData} 
                           radius={this.props.navigation.state.params.radius} 
                           x={this.props.navigation.state.params.x}
                           y={this.props.navigation.state.params.y}
                           navigation={this.props.navigation}/>
        )
    }
};
