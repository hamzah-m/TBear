import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Profile component
 */

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    avatar: {
        alignItems: 'center',
        marginTop: 15
    },
    label: {
        color: 'gray',
        fontSize: 20,
    },
    info: {
        color: colors,
        fontSize: 25,
        height: 30,
        width: '75%',
        marginBottom: 10,
    },
    row: {
        marginTop: 15,
        left: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
        width: '94%'
    }
})