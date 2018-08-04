import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Picture component
 */

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    row: {
        marginTop: 15,
        left: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
        width: '94%'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    button: {
        height: 50,
        width: '50%',
        padding: 10,
        justifyContent: 'center'
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