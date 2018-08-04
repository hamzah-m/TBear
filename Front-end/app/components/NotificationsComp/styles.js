import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Notifications component
 */

export default StyleSheet.create({
    listItem: {
        height: 80, 
        padding: 10, 
        borderBottomColor: colors, 
        borderBottomWidth: 1, 
        flexDirection: 'row'
    },
    title: {
        fontSize: 17
    },
    subtitle: {
        marginTop: 5,
        color: 'gray'
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '30%'
    },
    button: {
        padding: 10, 
        justifyContent: 'center', 
        borderRadius: 7, 
        backgroundColor: colors, 
        width: '75%', 
        height: '85%'
    },
    buttonText: {
        textAlign: 'center', 
        fontWeight: 'bold',
        color: 'white', 
        fontSize: 17
    }
})