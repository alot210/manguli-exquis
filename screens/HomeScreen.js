import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

//Firebase
import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAYyXg8VkGWkRnUPwfLRP89BFYnrYri4bA",
    authDomain: "manguli-exquis.firebaseapp.com",
    databaseURL: "https://manguli-exquis.firebaseio.com",
    storageBucket: "manguli-exquis.appspot.com"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
let database = firebase.database();


export default class HomeScreen extends React.Component {
  constructor(props){
      super(props);

      //handleCreate = {this.handleCreate.bind(this)}
      //loginUser = {this.loginUser().bind(this)}

      this.state = {  username: "Anonymous",
                      email: "test@test.de",
                      password: "Passwort",
                      user_id: 1}
  }

  static navigationOptions = {
    header: null,
  };

  registerUser(){
      let _userID = 1;
      let _username = this.state.username;
      let _email = this.state.email;
      let _password = this.state.password;
      let data = [];
      let found = false;

      let allUser = firebase.database().ref('user/');
      allUser.once('value', function (snapshot) {
          snapshot.forEach(function (item) {
              data.push(item.child("email").val());
              _userID = item.child("userID").val();
          });
          //console.log("inner: "+data);
          //ID hochzählen für nächsten
          _userID = _userID+1;

          /*console.log(data);
          console.log(data.length);
          console.log(data[0]);
          console.log(_email);
          console.log("ID"+_userID);*/
          for(let i = 0; i < data.length; i++){
              if(data[i]===_email){
                  found = true;
                  break;
              } else {
                  found = false;
              }
          }
          if(!found){
              firebase.database().ref('user/' + _userID).set({
                  userID: _userID,
                  username: _username,
                  email: _email,
                  password: _password
              });
              console.log(_username+" wurde registriert");
          } else {
              console.log("Sie sind bereits registriert!!!")
          }
      });
  }

  loginUser(_that) {
      let _userID = 1;
      let _username = this.state.username;
      let _email = this.state.email;
      let _password = this.state.password;
      let data = [];

      let allUser = firebase.database().ref('user/');
      allUser.once('value', function (snapshot) {
          snapshot.forEach(function (item) {
              data.push(item)
          });
          //console.log(data[0].child("username").val());
          //console.log(data[1].child("password").val());
          let logged = false;
          let loggedUser;
          for(let i = 0; i < data.length; i++){
              if(data[i].child("email").val() === _email &&
                 data[i].child("password").val() === _password){
                  logged = true;
                  loggedUser = data[i];
                  console.log(loggedUser);
                  console.log(loggedUser.child("username").val());
              }
          }
          if(logged){
              console.log("Sie wurden angemeldet!");
              _that.setState(state => ({username: loggedUser.child("username").val(),
                                        email: loggedUser.child("email").val(),
                                        password: loggedUser.child("password").val(),
                                        user_id: loggedUser.child("userID").val()}));
          } else {
              console.log("Mail oder Passwort sind falsch!");
          }

      });
  }

  getUserData(){
      let alluser = firebase.database().ref('user/');
      alluser.on('value', function (snapshot) {
          let data = [];
          snapshot.forEach(function (item) {
              data.push(item.child("email").val());
          });

          data.forEach(function (item) {
              console.log("array: "+item);
          })
          console.log(data);
      });


      /*let username = firebase.database().ref('user/' + 2);
      username.on('value', function (snapshot) {
          var user = (snapshot.val().username) || 'Anonymous';
          console.log("TEST: " + user);
      });*/



  /*this.setState(state => ({vorname: user}));*/
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            <Text>Manguli Exquis</Text>

            <TextInput
                style={{height: 40, width: 100, borderColor: '#000000', borderWidth: 1}}
                value={this.state.username}
                onChangeText={(username) => this.setState({username})}
            />
            <TextInput
                style={{height: 40, width: 100, borderColor: '#000000', borderWidth: 1}}
                value={this.state.email}
                onChangeText={(email) => this.setState({email})}
            />
            <TextInput
                style={{height: 40, width: 100, borderColor: '#000000', borderWidth: 1}}
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
            />

            <Button
                onPress={() => this.registerUser()}
                title="Hinzufügen"
                color="#00ff00"
            />

              <View style={{paddingTop: 20}}>
                  <Button
                      onPress={()=>this.loginUser(this)}
                      title={"Anmelden"}
                      color="#0000ff"
                  />
              </View>

            <View style={{paddingTop: 20}}>
              <Button
                  onPress={()=>this.getUserData()}
                  title={"Auslesen test"}
                  color="#ff0000"
              />
            </View>
          </View>

        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
