/** 
 * Takes care of user sign in and keeps user signed without having to sign in again
 */

import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true"); // If user has already signed in, no need to sign in again

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY); // If user signs out, has to sign in again

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
