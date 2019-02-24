import React from 'react';
import {ImageBackground, View} from 'react-native';
import { Container, Content, Form, Label, Input, Item, Button, Text } from 'native-base';
import firebase from '../constants/FirebaseConfig';

import HeaderBar from "../components/HeaderBar";
import Colors from "../constants/Colors";


export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: "",
          email: "",
          password: "",
          user_id: 1,
          login: false,
          register: false,
          is_logged_in: false,
        }
    }

    static navigationOptions = {
        drawerLabel: () => null
    };

    registerUser(_that){
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
                if(data[i]===_email || _password === "" || _email === ""){
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
                    password: _password,
                    islogged: true
                });
                //console.log(_username+" wurde registriert");
              alert("Die Registration für "+_username+" wurde abgeschlossen.");

                _that.props.navigation.navigate("Lobby", {
                    userID: _userID
                });
            } else {
                if(_password === "" || _email === ""){
                  alert("Passwort oder Mail fehlen!");
                } else {
                  alert("Sie sind bereits registriert.");
                }
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
                    data[i].child("password").val() === _password &&
                    data[i].child("islogged").val() === false){
                    logged = true;
                    loggedUser = data[i];
                    //console.log(loggedUser);
                    //console.log(loggedUser.child("username").val());
                }
            }
            if(logged){
                //console.log("Sie wurden angemeldet!");
                _that.setState(state => ({username: loggedUser.child("username").val(),
                    email: loggedUser.child("email").val(),
                    password: loggedUser.child("password").val(),
                    user_id: loggedUser.child("userID").val(),
                    is_logged_in: true}));
                firebase.database().ref('user/' + _that.state.user_id).update({
                    islogged: true
                });

                _that.props.navigation.navigate("Lobby", {
                    userID: loggedUser.child("userID").val()
                });
            } else {
                //console.log("Mail oder Passwort sind falsch!");
                alert("Mail oder Passwort sind falsch.");
            }

        });
    }

    render() {
      const Register = () => (
        <Container>
          <HeaderBar {...this.props} title='Login' />
        <View>
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
            onPress={() => this.registerUser(this)}>
            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Registrieren</Text>
          </Button>
          <Button
            style={{
              backgroundColor: Colors.secondaryColor,
              alignSelf: 'center',
              marginBottom: 10,
              width: 150
            }}
            onPress={()=> this.setState({register: false})}
          >
            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Zurück</Text>
          </Button>
        </View>
        </View>
        </Container>
      );

      const Login = () => (
        <Container>
          <HeaderBar {...this.props} title='Login' />
        <View>
          <Form style={{marginTop: 64}}>
            <Item floatingLabel>
              <Label>E-Mail</Label>
              <Input value={this.state.email} onChangeText={(email) => this.setState({email})} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true} value={this.state.password} onChangeText={(password) => this.setState({password})} />
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
              onPress={()=> this.setState({login: false})}
            >
              <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Zurück</Text>
            </Button>
          </View>
        </View>
        </Container>
      );

      const DefaultLayout = () => (
        <Container>
          <HeaderBar {...this.props} title='Login' />
            <Text style={{backgroundColor: '#ffffff', marginTop: 70, marginLeft: 10, marginRight: 10, fontSize: 24, textAlign: 'center'}}>
                Bist du zum ersten Mal hier? Dann registriere dich.</Text>
        <View style={{flex: 1, justifyContent: 'center'}}>

          <Button
            style={{
              backgroundColor: Colors.secondaryColor,
              alignSelf: 'center',
              marginBottom: 10,
              width: 150
            }}
            onPress={()=> this.setState({register: true})}
          >
            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Registrieren</Text>
          </Button>

          <Button
            style={{
              backgroundColor: Colors.secondaryColor,
              alignSelf: 'center',
              marginBottom: 10,
              width: 150
            }}
            onPress={()=> this.setState({login: true})}
          >
            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Anmelden</Text>
          </Button>
        </View>
        </Container>
      );

      if(this.state.login)
        return Login();
      else if(this.state.register)
        return Register();
      else
        return DefaultLayout();
    }
}