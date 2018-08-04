import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Edit profile component
 */

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
    },
    avatar: {
        alignItems: 'center',
        marginTop: 15
    },
    label: {
        color: 'gray',
        fontSize: 20,
    },
    textInput: {
        color: colors,
        fontSize: 25,
        height: 35,
        width: '94%',
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