import React, { Component } from 'react'
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import UserAvatar  from 'react-native-user-avatar'
import styles from './styles'
import colors from '../../data/colors'

/** 
 * Component to user's profile
 */
export default class ProfileComp extends Component {

    constructor(props) {
        super(props)
        this.state = { 
          isLoading: true,
          data: '',
        }
      }

    componentDidMount(){
        return fetch('https://6fo5juppx2.execute-api.us-east-1.amazonaws.com/rds', {
          method: 'POST',
          body: JSON.stringify({
            "request": {
              "type": user == "doctor" ? "getDoctor" : "getPatient",
              "params": id.toString()
            }
          }),
        }
        ).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.body !== undefined)  {
            var data = JSON.parse(responseJson.body)
            if(data.length != 0) { // If there are items in the list
              this.setState({
                isLoading: false,
                data: data,
              });
            }
          }
        })
        .catch((error) =>{
          console.error(error);
        });
      }

    render() {

        if(this.state.isLoading){
            return(
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color={colors} />
              </View>
            )
          }

        return (
            <ScrollView style={styles.container}>

                {/* Doctor's profile */}
                { user == 'doctor' &&
                    <View>
                        <View style={styles.avatar}>
                            <UserAvatar  size="100" name="chocolate" color={colors} src={doctors[0].image} />
                        </View>
                        <View style={styles.body}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Name</Text>
                                <Text style={styles.info}>{doctors[0].name}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Office</Text>
                                <Text style={styles.info}>{doctors[0].office}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Number/Ext</Text>
                                <Text style={styles.info}>{doctors[0].contactNumber}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Email</Text>
                                <Text adjustsFontSizeToFit style={styles.info}>{doctors[0].email}</Text>
                            </View>
                        </View>
                    </View>
                }

                {/* Patient's profile */}
                { user == 'patient' &&
                    <View>
                        <View style={styles.avatar}>
                            <UserAvatar  size="100" name="chocolate" color='deepskyblue' src={patients[0].image} />
                        </View>
                        <View style={styles.body}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Name</Text>
                                <Text style={styles.info}>{patients[0].name}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Date of Birth</Text>
                                <Text adjustsFontSizeToFit style={styles.info}>{patients[0].dob}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Number</Text>
                                <Text style={styles.info}>03/656-928</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Email</Text>
                                <Text adjustsFontSizeToFit style={styles.info}>example@gmail.com</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Gender</Text>
                                <Text adjustsFontSizeToFit style={styles.info}>{patients[0].gender}</Text>
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
        ) 
    }
  }

  