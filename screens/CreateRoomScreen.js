import React from 'react';
import HeaderBar from "../components/HeaderBar";
import firebase from '../constants/FirebaseConfig';

export default class CreateRoomScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

  createRoom() {
    let _roomID = 1;
    let _passwort = "Passwort";
    let _name = "Name";
    let _link = "";
    let _mode = "word";
    let possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";

    for(let i = 0; i < 5; i++){
        _link = _link + possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }

    firebase.database().ref('room/' + _roomID).set({
        roomID: _roomID,
        passwort: _passwort,
        name: _name,
        link: _link,
        mode: _mode
    });
  }

  render() {
    return (
      <HeaderBar {...this.props} title='Raum Erstellung' />
    );
  }
}