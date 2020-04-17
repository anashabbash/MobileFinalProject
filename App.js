import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert, StyleSheet,Image } from 'react-native';
import { db, firestore, auth } from './FirebaseConfig';

export default function App() {
  [registrationEmail, setRegistrationEmail] = useState('');
  [registrationPassword, setRegistrationPassword] = useState('');
  [loginEmail, setLoginEmail] = useState('');
  [loginPassword, setLoginPassword] = useState('');
  [loggedIn, setLoggedIn] = useState(false);
  [databaseData, setDatabaseData] = useState('');


  registerWithFirebase = () => {
    if (registrationEmail.length < 4) {
      Alert.alert('Please enter an email address.');
      return;
    }

    if (registrationPassword.length < 4) {
      Alert.alert('Please enter a password.');
      return;
    }

    auth.createUserWithEmailAndPassword(registrationEmail, registrationPassword)
      .then(function (_firebaseUser) {
        Alert.alert('user registered!');

        setRegistrationEmail('');
        setRegistrationPassword('');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          Alert.alert('The password is too weak.');
        }
        else {
          Alert.alert(errorMessage);
        }
        console.log(error);
      }
      );
  }

  loginWithFirebase = () => {
    if (loginEmail.length < 4) {
      Alert.alert('Please enter an email address.');
      return;
    }

    if (loginPassword.length < 4) {
      Alert.alert('Please enter a password.');
      return;
    }

    auth.signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(function (_firebaseUser) {
        Alert.alert('user logged in!');
        setLoggedIn(true);

        // load data
        //retrieveDataFromFirebase();
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          Alert.alert('Wrong password.');
        }
        else {
          Alert.alert(errorMessage);
        }
      }
      );
  }

  signoutWithFirebase = () => {
    auth.signOut().then(function () {
      // if logout was successful
      if (!auth.currentUser) {
        Alert.alert('user was logged out!');
        setLoggedIn(false);
      }
    });
  }

  return (
    <View style={styles.form}>
      {!loggedIn &&
        <View>
          <View>
            <Image style={styles.img} source={require('./assets/logo.jpg')} />
            <Text style={styles.label}>Welcome to Naughty</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={ (value) => setRegistrationEmail(value) }
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
              placeholder="Email:"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={ (value) => setRegistrationPassword(value) }
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="password"
              keyboardType="visible-password"
              placeholder="Password:"
            />
            <Button style={styles.button} title="Register" onPress={registerWithFirebase} color="#E91E63" />
            <Text style={styles.textRegister}> ───────────────────────</Text>

          </View>
          
          <View>
            <Text style={styles.label}>Have an account?</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={ (value) => setLoginEmail(value) }
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
              placeholder="Email:"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={ (value) => setLoginPassword(value) }
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="password"
              keyboardType="visible-password"
              placeholder="Password:"
            />
            <Button style={styles.buttonLogin} title="Login" onPress={loginWithFirebase} color="#9C27B0" />
          </View>
        </View>
      }
      {loggedIn &&
        <View>
            <Image style={styles.img} source={require('./assets/logo.jpg')} />
            <View style={styles.form}>
              <Text style={styles.label}>Choose the Note Type</Text>
            </View>
            <View>
            <Button style={styles.button1} title="Add a Text Note"  />
            <Text style={styles.textRegister}> ───────────────────────</Text>
            <Button style={styles.button2} title="Add a Voice Memo" />
            <Text style={styles.textRegister}> ───────────────────────</Text>
            <Button style={styles.button3} title="Add a picture as a note" />
            <Text style={styles.textRegister}> ───────────────────────</Text>
            <Button style={styles.button4} title="View all notes"  />
            <Text style={styles.textRegister}> ───────────────────────</Text>
            </View>
            <View>
            <Button style={styles.signOutButton} title="Sign Out" onPress={signoutWithFirebase} color="red" />
            </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
      margin: 30,
      marginTop: 60,
  },
  img: {
    justifyContent: "center",
    marginLeft: 25,
  },
  label: {
      fontSize: 18,
      marginBottom: 30,
      textAlign: 'center',
      color:"darkblue"
  },
  textInput: {
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 15,
      paddingVertical: 4,
      paddingHorizontal: 2,
      textAlignVertical: 'top'
  },
  buttonContainer: {
    paddingVertical: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonLogin:{
    color:"green",
  }, 
  button: {
      width: '40%',
  },
  signOutButton: {
    paddingVertical: 40,
    paddingTop:10,
  } 
});
