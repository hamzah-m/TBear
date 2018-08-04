import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Add patient component
 */

export default StyleSheet.create({
    avatar: {
        alignItems: 'center',
        marginTop: 10
    },
    formLabel: {
        fontSize: 20,
        
    },
    formInput: {
       fontSize: 20,
       color: colors,
       width: '80%'
    },
    radioForm: {
        marginTop: 25,
    },
    buttons: {
        flexDirection: 'row',
        bottom: 0
    },
    button: {
        height: 50,
        width: '50%',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    save: {
        backgroundColor: colors,
    },
    cancel: {
        backgroundColor: '#d95040'
    }
})