import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Assign pic component
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
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    button: {
        height: 50,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#d95040',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    }
})