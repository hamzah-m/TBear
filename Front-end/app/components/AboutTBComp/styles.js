import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for AboutTB component
 */

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
    },
    h1: {
        color: colors,
        fontSize: 30,
        marginBottom: 5
    },
    h2: {
        color: colors,
        fontSize: 25,
        marginBottom: 5
    },
    paragraph: {
        marginBottom: 20,
    }
})