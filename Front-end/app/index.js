import React from "react";
import { rootNavigator } from "./router";
import { isSignedIn } from "./auth";


/** 
 * Upon one successful sign in or sign up, you can change the user to "patient" or "doctor" to shift perspectives
 *  and also change the id to 21 for doctor, and 35 for patient.
 * Initial sign up for doctor:
 *  email: email
 *  password: any passowrd will work
 */
global.user = '' // global user variable to keep track of type of user signed in
global.id = -1 // global id variable to keep track of id of user

// Global variables as placeholders
global.patients = [
  {name: 'Devin Jackson', gender: 'Male', notification: "", dob: "04/02/1990", image: "https://randomuser.me/api/portraits/men/52.jpg", bump:'something', size:'7mm', visitDate: "10/1/2018 - 12:21 AM", seen: false, result:'Make appointment', timeOfTest: "4:00 PM", dateOfTest: "15/1/2018"},
  {name: 'Denise Mccoy', gender: 'Female', notification: "", dob: "03/02/1993", image: "https://randomuser.me/api/portraits/women/73.jpg", bump: '', size:'7mm', visitDate: "15/2/2018 - 4:27 PM",seen: true, result: 'Not Tuberculosis', timeOfTest: "4:00 PM", dateOfTest: "15/1/2018"},
  {name: 'Jacob Tucker', gender: 'Male', notification: "", dob: "03/02/1993", image: "https://randomuser.me/api/portraits/men/12.jpg", bump:'something', size:'7mm', visitDate: "20/3/2018 - 11:43 AM",seen: true, result: 'Not Tuberculosis', timeOfTest: "4:00 PM", dateOfTest: "15/1/2018"},
  
]
global.doctors = [
  {name: 'Ghassan Hamade', notification: "", office: 'Sawwaf Bldg', contactNumber: '3020', email: 'example@aub.edu.lb' , image: "https://website.aub.edu.lb/units/ehmu/about/PublishingImages/Dr.%20Hamadeh.jpg", visitDate: "10/1/2018 - 12:21 AM", result: 'Not Tuberculosis'},
]

/** 
 * Entry point of the app
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const Layout = rootNavigator(signedIn);
    return <Layout />;
  }
}

