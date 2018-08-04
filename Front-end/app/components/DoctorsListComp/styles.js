import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Doctors list component
 */

export default StyleSheet.create({
    viewContainerStyle: {
        height: '100%', 
        backgroundColor: 'white'
    },
    listContainerStyle: {
        marginTop: 0, 
        borderTopWidth: 0, 
        borderBottomWidth: 0, 
        height: '100%'
    },
    listItemStyle: {
        borderBottomWidth: 0, 
        backgroundColor: 'white', 
        height: 65, 
        justifyContent: 'center'
    }
})