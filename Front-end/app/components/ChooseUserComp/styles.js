import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Choose user component
 */
export default StyleSheet.create({
    container: { 
        justifyContent: 'center', 
        height: '100%', 
        backgroundColor: 'white' 
    },
    image: {
        width: 100, 
        height: 100
    },
    label: {
        color: colors, 
        marginTop: 10, 
        fontSize: 30, 
        fontWeight: 'bold'
    }
})