import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import SignUpDoctor from "./screens/SignUpDoctor";
import SignUpPatient from "./screens/SignUpPatient";
import SignIn from "./screens/SignIn";
import PatientsList from './screens/PatientsList'
import PatientInfo from './screens/PatientInfo'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import Notifications from './screens/Notifications'
import AddPatient from './screens/AddPatient'
import Camera from './screens/Camera'
import EditProfile from './screens/EditProfile'
import DoctorsList from './screens/DoctorsList'
import DoctorInfo from './screens/DoctorInfo'
import Picture from './screens/Picture'
import AssignPic from './screens/AssignPic'
import ChooseUser from './screens/ChooseUser'
import ForgotPassword from './screens/ForgotPassword'
import AboutTB from './screens/AboutTB'
import AddDoctor from './screens/AddDoctor'
import colors from './data/colors'

/** 
 * This file contains all the screens of the app and takes care navigating throughout the app
 */

const SignedOut = StackNavigator({
  ChooseUser: {
    screen: ChooseUser,
    navigationOptions: {
      title: "Sign Up As"
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      title: "Reset Password",
      headerTitleStyle: {
        fontSize: 25
      }
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  },
  SignUpDoctor: {
    screen: SignUpDoctor,
  },
  SignUpPatient: {
    screen: SignUpPatient,
  },
});

const PatientsListStack = StackNavigator({
  PatientsList: { screen: PatientsList,
    navigationOptions: {
      title: 'Patients'
    } 
  },
    PatientInfo: { screen: PatientInfo },
    AddPatient: { screen: AddPatient,
    navigationOptions: {
      title: 'New Patient'
    },
  },
})

const DoctorsListStack = StackNavigator({
  DoctorsList: { screen: DoctorsList,
    navigationOptions: {
      title: 'Doctors'
    } 
  },
  DoctorInfo: { screen: DoctorInfo },
  AddDoctor: { screen: AddDoctor,
    navigationOptions: {
      title: 'New Doctor'
    }
  }
})


const ProfileStack = StackNavigator({
  Profile: { screen: Profile,
    navigationOptions: {
      title: 'My Profile'
    } 
  },
})

const NotificationsStack = StackNavigator({
  Notifications: { 
    screen: Notifications,
    navigationOptions: {
      title: 'Notifications'
    }, 
  },
  PatientInfo: {
    screen: PatientInfo
  }
})

const SettingsStack = StackNavigator({
  Settings: { screen: Settings,
    navigationOptions: {
      title: 'Settings'
    }
  },
  EditProfile: { screen: EditProfile,
    navigationOptions: {
      title: 'Edit Profile',
    }
  },
  AboutTB: { screen: AboutTB,
    navigationOptions: {
      title: 'About TB',
    }
  },
})

const CameraStack = StackNavigator({
  Camera: { screen: Camera },
  Picture: { screen: Picture },
  AssignPic: { screen: AssignPic },
})

const PatientSignedIn = TabNavigator({
    DoctorsList: {
      screen: DoctorsListStack,
      navigationOptions: {
        tabBarLabel: "Home",
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "Profile",
      }
    },
    Camera: {
      screen: CameraStack,
      
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        tabBarLabel: "Notifications",
      }
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: "Settings",
      }
      
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let label;
        if (routeName === 'DoctorsList') {
          iconName = `home`;
        } else if (routeName === 'Profile') {
          iconName = `account`;
        } else if (routeName === 'Camera') {
          iconName = 'camera'
        } else if(routeName === 'Notifications') {
          iconName = 'bell'
        } else if (routeName === 'Settings') {
          iconName = 'settings'
        }
        return <MaterialCommunityIcons name={iconName} size={30} color={tintColor} />;
      },
    }),
  
    tabBarOptions: {
        activeTintColor: colors,
        inactiveTintColor: '#C4C4C4',
        iconColor: 'black',
        style: {
            backgroundColor: 'white'
        }
    }
  }
);

const DoctorSignedIn = TabNavigator({
  PatientsList: {
    screen: PatientsListStack,
    navigationOptions: {
      tabBarLabel: "Home",
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Profile",
    }
  },
  Camera: {
    screen: CameraStack,
    
  },
  Notifications: {
    screen: NotificationsStack,
    navigationOptions: {
      tabBarLabel: "Notifications",
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: "Settings",
    }
    
  },
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      let label;
      if (routeName === 'PatientsList') {
        iconName = `home`;
      } else if (routeName === 'Profile') {
        iconName = `account`;
      } else if (routeName === 'Camera') {
        iconName = 'camera'
      } else if(routeName === 'Notifications') {
        iconName = 'bell'
      } else if (routeName === 'Settings') {
        iconName = 'settings'
      }
      return <MaterialCommunityIcons name={iconName} size={30} color={tintColor} />;
    },
  }),

  tabBarOptions: {
      activeTintColor: colors,
      inactiveTintColor: '#C4C4C4',
      iconColor: 'black',
      style: {
          backgroundColor: 'white'
      }
  }
}
);

export const rootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      DoctorSignedIn: {
        screen: DoctorSignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      PatientSignedIn: {
        screen: PatientSignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? (user == "patient") ? "PatientSignedIn" : "DoctorSignedIn" : "SignedOut"
    },
  );  
};
