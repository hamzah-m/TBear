import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Sign in component
 */

export default StyleSheet.create({
    container: { 
        justifyContent: 'center', 
        height: '100%', 
        backgroundColor: 'white' 
    },
    button: {
        backgroundColor: colors, 
        marginTop: 20, 
        padding: 10, 
        width: '87%'
    },
    buttonText: {
        fontWeight: 'bold', 
        fontSize: 25, 
        textAlign: 'center', 
        color: 'white'
    }
})