import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Settings component
 */

export default StyleSheet.create({
    container: { 
        justifyContent: 'center', 
        height: '100%', 
        backgroundColor: 'white' 
    },
    button: {
        backgroundColor: colors, 
        marginBottom: 10, 
        padding: 10, 
        width: '87%'
    },
    buttonText: {
        fontWeight: 'bold', 
        fontSize: 20, 
        textAlign: 'center', 
        color: 'white'
    }
})