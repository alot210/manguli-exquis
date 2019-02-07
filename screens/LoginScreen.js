import React from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Label, Input, Item, Button, Text } from 'native-base';
import firebase from '../constants/FirebaseConfig';

import HeaderBar from "../components/HeaderBar";
import Colors from "../constants/Colors";


export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
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

            //ID hochzählen für nächsten
            _userID = _userID+1;

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
            });
            console.log(data);
        });
    }

    render() {
        return (
          <Container>
            <HeaderBar {...this.props} title='Login' />
            <Content>
              <Form style={{marginTop: 64}}>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input value={this.state.username} onChangeText={(username) => this.setState({username})} />
                </Item>
                <Item floatingLabel>
                  <Label>E-Mail</Label>
                  <Input value={this.state.email} onChangeText={(email) => this.setState({email})} />
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input value={this.state.password} onChangeText={(password) => this.setState({password})} />
                </Item>
              </Form>

              <View style={{marginTop: 64}}>
                <Button
                  style={{
                    backgroundColor: Colors.secondaryColor,
                    alignSelf: 'center',
                    marginBottom: 10,
                    width: 150
                  }}
                  onPress={() => this.registerUser()}>
                  <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Hinzufügen</Text>
                </Button>
                <Button
                  style={{
                    backgroundColor: Colors.secondaryColor,
                    alignSelf: 'center',
                    marginBottom: 10,
                    width: 150
                  }}
                  onPress={()=>this.loginUser(this)}
                >
                  <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Anmelden</Text>
                </Button>

                <Button
                  style={{
                    backgroundColor: Colors.secondaryColor,
                    alignSelf: 'center',
                    marginBottom: 10,
                    width: 150
                  }}
                  onPress={()=>this.getUserData()}
                >
                  <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Auslesen Test</Text>
                </Button>
              </View>
            </Content>
          </Container>
        );
    }
}