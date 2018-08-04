import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import AddButton from "../AddButton/AddButton"
import Swipeout from 'react-native-swipeout'
import styles from './styles'
import colors from '../../data/colors'


/** 
 * Component to display patient's list of doctors
 */
export default class DoctorsListComp extends Component {
  
    constructor(props) {
      super(props)
      this.state = { 
        filteredData: '',
        isLoading: true,
        dataSource: '',
      }
    }
  
    // As soon as the component mounts, we retrieve the list of the patients's doctors
    componentDidMount(){
      return fetch('https://6fo5juppx2.execute-api.us-east-1.amazonaws.com/rds', {
        method: 'POST',
        body: JSON.stringify({
          "request": {
            "type": "getPatientDoctor",
            "params": id.toString()
          }
        }),
      }
      ).then((response) => response.json())
      .then((responseJson) => {
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
  
    // The seperator we will be using (not the default ones)
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
    
    renderHeader = () => {
      return (
          <SearchBar 
            lightTheme
            round
            placeholder="Search"
            containerStyle={{backgroundColor: 'white'}}
            inputStyle={{backgroundColor: '#EAEAEA', color: colors}}
            onChangeText={(e) => this.filterData(e)}
          />
      )
    };
  
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
               <Swipeout>
                <ListItem
                  roundAvatar
                  title={item[0] + " " + item[1]}
                  subtitle={lastVisit}
                  titleStyle={{fontSize: 20}}
                  avatar={{}}
                  containerStyle={styles.listItemStyle} 
                  onPress={ () => { this.props.navigation.navigate('DoctorInfo', {item}) }}
                  
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
  