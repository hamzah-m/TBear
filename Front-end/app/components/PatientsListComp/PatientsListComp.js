import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import Swipeout from 'react-native-swipeout'
import AddButton from '../AddButton/AddButton'
import styles from './styles'
import colors from '../../data/colors'


/** 
 * Component to display doctor's list of patients
 */
export default class PatientsListComp extends Component {
  
    constructor(props) {
      super(props)
      this.state = { 
        filteredData: '',
        isLoading: true,
        dataSource: '',
      }
    }

    // As soon as the component mounts, we retrieve the list of doctor's patients
    componentDidMount(){
      return fetch('https://6fo5juppx2.execute-api.us-east-1.amazonaws.com/rds', {
        method: 'POST',
        body: JSON.stringify({
          "request": {
            "type": "getDoctorPatients",
            "params": id.toString()
          }
        }),
      }
      ).then((response) => response.json())
      .then((responseJson) => {
        console.log("Response:")
        console.log(responseJson)
        if(responseJson.body !== undefined)  {
          var data = JSON.parse(responseJson.body)
          if(data.length != 0) { // If there are items in the list
            data.sort()
            this.setState({
              isLoading: false,
              dataSource: data,
              filteredData: data,
            });
          }
        }
      })
      .catch((error) =>{
        console.error(error);
      });
    }
   
   
    
    filterData(e) {
      var temp = []
      if(e != '') {
        this.state.dataSource.map((userData) => {
          if(userData[0].toLowerCase().includes(e.toLowerCase())) {
            temp.push(userData)
          }
        });
      }
      if(e == '') {
        temp = this.state.dataSource
      }
      this.setState({
        filteredData: temp
      }) 
    }

    delete(item) {
      Alert.alert(
        'Delete ' + item[0] + " " + item[1] + '?',
        'Are you sure you want to delete this patient?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Delete', onPress: () => {
            this.setState({isLoading: true})
            return fetch('https://6fo5juppx2.execute-api.us-east-1.amazonaws.com/rds', {
              method: 'POST',
              body: JSON.stringify({
                "request": {
                  "type": "deletePatient",
                  "params": item[2] // Id of the selected patient
                }
              }),
            }
            ).then((response) => response.json())
            .then((responseJson) => {
              this.setState({isLoading: false})
              console.log(responseJson)
              Alert.alert(
                'Delete successful.',
                '',
                [
                  {text: 'OK', style: 'cancel'},
                ],
              )
            })
            .catch((error) =>{
              console.error(error);
            });

          }},
        ],
      )
    }
    
    // Functin to render header of list (search bar)
    renderHeader = () => {
      return (
          <SearchBar 
            lightTheme
            round
            placeholder="Search"
            containerStyle={{backgroundColor: 'white',}}
            inputStyle={{ backgroundColor: '#EAEAEA', color: colors.text}}
            onChangeText={(e) => this.filterData(e)}
          />
      )
    };

    // Function that renders separator (horizontal line) between each list item
    renderSeparator = () => {
      return (
        <View style={{backgroundColor: 'white'}}>
        <View
          style={{
          height: 1,
          opacity: 0.5,
          backgroundColor: colors,
          width: '86%',
          left: '14%'
        }}
        />
      </View>
      )
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
        <View style={styles.viewContainerStyle}>
          <List containerStyle={styles.listContainerStyle} >
            <FlatList
              
              ListHeaderComponent={this.renderHeader}
  
              keyExtractor= {(item, index) => index.toString()}
              data={this.state.filteredData}
              renderItem={({ item }) => (
                
                <Swipeout 
                right={[
                    {
                      text: 'Delete',
                      backgroundColor: "#d95040",
                      onPress: () => this.delete(item)
                    }
                ]}
                >
                <ListItem
                  roundAvatar
                  title={item[0] + " " + item[1]}
                  subtitle={"last visit"}
                  titleStyle={{fontSize: 20}}
                  avatar={{title:"chocolate"}}
                  containerStyle={styles.listItemStyle} 
                  onPress={ () => { this.props.navigation.navigate('PatientInfo', {item}) }}
                />
               
                {/* Separator beteween list items */}
                {this.renderSeparator()}
                
                </Swipeout>
              )}
            />
              
            
          </List>
            <AddButton style={{borderRadius: 10}} navigation={this.props.navigation}/>
        </View>
      )
    }
  }
  