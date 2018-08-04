import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../data/colors'

/** 
 * Styles for Camera component
 */

export default StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#000',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    flex: 0.4,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  zoomButton: {
    height: 40, 
    width: 40, 
    alignSelf: 'flex-end', 
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,

  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8
  },
  icon: {
    borderColor: '#00bd86',
    borderWidth: 2,
  },
  picButton: {
    backgroundColor: 'white',
    height: 56,
    width: 56,
    borderRadius: 28,
  },
  row: {
    flexDirection: 'row',
  },
});