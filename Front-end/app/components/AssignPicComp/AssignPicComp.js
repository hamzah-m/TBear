import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { List, ListItem, SearchBar } from "react-native-elements";
import Swipeout from 'react-native-swipeout'
import styles from './styles'
import colors from '../../data/colors'

/** 
 * Component that displays list of doctor's (or patient's - depending on the user type) patients (or doctors)
 * so the user can choose who to assign the taken picture to and submit for processing, and also create a test for the 
 * corresponding patient and doctor
 */

export default class AssignPicComp extends Component {
    
    constructor(props) {
      super(props)
      this.state = { 
        filteredData: '',
        isLoading: true,
        dataSource: '',
      }
    }

     
     // As soon as the component mounts, get list of doctor's/patient's list of patients/doctors. 
    componentDidMount(){

      // If the user is a doctor, get the list of his/her patients
      if(user == "doctor") {
        // Request to get doctor's list of patients
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
        if(responseJson.body !== undefined) {
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
        console.error("Get doctor patients error: " + error);
      });

      // If the user is a patient, get the list of his/her doctors
      } else if (user == "patient") {
        // Request to get patient's list of doctors
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
          console.error("Get patient doctors error: " + error);
        });
      }
    }

    // Finish or stop adding an image and test and return to previous screen
    return() {
      {
        this.props.navigation.dispatch( 
          NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Camera' })],
            })
        )       
      }
    }

    // Function that handles uploading the image to s3. Throws error if failed.
    uploadImage(item) {
      const RNS3 = require('react-native-aws3').RNS3
      var file = ''
      if(user == "doctor") {
          file = {
          uri: this.props.imageData.uri,
          // Unique identifier for name to easily retrieve image for the appropriate linked patient-doctor
          name: "patient_" + item[2] + "_doctor_" + id + ".jpg", 
          type: "image/jpg"
        }
      } else if (user == "patient") {
        file = {
          uri: this.props.imageData.uri,
          // Unique identifier for name to easily retrieve image for the appropriate linked patient-doctor
          name: "patient_" + id + "_doctor_" + item[2] + ".jpg",
          type: "image/jpg"
        }
      }

      const options = {
        keyPrefix: "tbear-299/",
        bucket: "aub-tbtest",
        region: "us-east-1",
        accessKey: "AKIAIHMLFEDH7672RVXQ",
        secretKey: "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",
        successActionStatus: 201
      }
      
      RNS3.put(file, options).then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        console.log(response.body);
        
      });
    }

    // Function to get the current date which will be used for the test date
    getDate() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();

        if( minutes < 10 ) {
            minutes = "0" + minutes
        }

        if(hours > 12) {
          var fullDate =  "" + date + '/' + month + '/' + year + " - " + (hours-12) + ':' + minutes + 'PM'
        } else {
          var fullDate =  "" + date + '/' + month + '/' + year + " - " + hours + ':' + minutes + 'AM'
        }

        return fullDate
    }

    // Assign the pic to the selected doctor/patient
    assignPic(item) {
      
      this.uploadImage(item)

      // Request to process the image and obtain the size
      // fetch('https://eg8uozgyi0.execute-api.us-east-1.amazonaws.com/opencv', {
      // method: 'POST',
      // body: JSON.stringify({
      //   "coordX": 500,
      //   "coordY": 500,
      //   "radius": 20,
      //   "base64": this.props.imageData.base64
      // }),
      // }).then((response) => response.json())
      // .then((responseJson) => {
      //   var data2 = JSON.stringify(responseJson)
      //   console.log("Assign pic response:" + data2)
      //   console.log("Radius:" + this.props.radius)
      //   // patients[patients.length-1].size = response
      //   this.setState({
      //     data: data2
      //   })
      // })
      // .catch((error) =>{
      //   console.error("Assign pic error " + error);
      // });

      var fullDate = this.getDate()

      // Request to add test to linked patient-doctor
      fetch('https://6fo5juppx2.execute-api.us-east-1.amazonaws.com/rds', {
      method: 'POST',
      body: JSON.stringify({
        "request": {
          "type": "addTest",
          "params": "",
          "dateOfTest": fullDate,
          // If user is a patient, obtain id from global variable, else get from selected item in list
          "patientId": user == "patient" ? id.toString : item[2], 
          "diameter": "25",
          "prognosis": "",
          // If user is a doctor, obtain id from global variable, else get from selected item in list
          "doctorId": user == "doctor" ? id.toString : item[2]
        }
      }),
      }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(
          'Success!',
          'Test picture has been assigned to ' + item[0] + " " + item[1],
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: () => this.return()},
          ],
          { cancelable: false }
        )
      })
      .catch((error) =>{
        console.error("Add test error " + error);
      });

       
        
    }

    // Function to handle filtering the list when search bar is used
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

    // Function to render header of list (search bar)
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

    // Function to render separator (horizontal line) between list items
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
      // Loading animation when retrieving list
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={colors} />
          </View>
        )
      }

      // Displays list after finished retrieving
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
                    titleStyle={{fontSize: 20}}
                    avatar={{}}
                    containerStyle={styles.listItemStyle} 
                    onPress={ () => this.assignPic(item)}
                    hideChevron={true}
                    />
              
                    {/* Separator beteween list items */}
                    {this.renderSeparator()}
                </Swipeout>
              )}
            />
              
            </List>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => this.return()}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>    
            </View>
        </View>
      )
  }
}
