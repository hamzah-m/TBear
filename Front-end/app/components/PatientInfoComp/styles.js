import { StyleSheet } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Patient info component
 */

export default StyleSheet.create({
    text: {
        color: colors,
        left: 10,
    },
    headerSection: {
        justifyContent: 'center', 
        height: 90, 
        backgroundColor: '#EAEAEA', 
        paddingLeft: 10, 
        borderBottomColor: colors, 
        borderBottomWidth: 0.7, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    sectionTitle: {
        fontSize: 25, 
        fontWeight: 'bold', 
    },
    sectionSubtitle: {
        fontSize: 20, 
    },
    visitSection: {
        height: 110,
        borderBottomColor: colors, 
        borderBottomWidth: 0.7, 
        justifyContent: 'center'
    },
    label: {
       fontSize: 20,
       color: 'gray'
    },
    data: {
        fontWeight: 'bold',
        fontSize: 20,
        left: 10
    },
    testSection: {
        height: 210,
        borderBottomWidth: 0.7,
        borderBottomColor: colors
    },
    testSectionTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30
    },
    testSectionMid: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 170,
    },
    icon: {
        marginRight: 5,
    },
    pic: {
        height: 150,
        width: 150,
        marginRight: 15,
        left: 10,
    },
    dropdown: {
        marginTop: 10,
        left: 10,
        borderWidth: 1,
        borderColor: colors,
        backgroundColor: 'white',
        borderRadius: 5,
        height: 30,
        width: '90%',
        justifyContent: 'center'
    },
    dropdownText: {
        fontSize: 20,
        color: 'black',
        left: 5,
    },
    result: {
        height: "100%",
    },
    resultText: {
        fontSize: 25,
        fontWeight: 'bold',
        left: 10
    },
    addButton: {
        height: 40,
        width: 75,
        justifyContent: 'center',
        backgroundColor: colors,
        borderRadius: 7,
        marginTop: 7
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    submitButton: {
        height: 50,
        width: '100%',
        backgroundColor: colors,
        justifyContent: 'center',
    }
})