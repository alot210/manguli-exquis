import React from 'react';
import HeaderBar from "../components/HeaderBar";

export default class CreateRoomScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

  createRoom() {
    let _roomID = 1;
    let _passwort = "Passwort";
    let _name = "Name";
    let _link = "crypt";
    let _mode = "word";

    firebase.database().ref('room/' + _roomID).set({
        roomID: _roomID,
        passwort: _passwort,
        name: _name,
        link: _link,
        mode: _mode
    });
  }

  enterRoom() {
    let _link = "crypt";
    let data = [];
    let found = false;
    let allRooms = firebase.database().ref('room/');
    allRooms.once('value', function (snapshot) {
        snapshot.foreach(function (item) {
            data.push(item.child("link").val());
        });

        for (let i = 0; i < data.length; i++){
          if(data[i] === _link){
            console.log("Erfolgreich dem Raum beigetreten!");
            found = true;
            break;
          }
        }

        if(!found){
          console.log("Es gibt keinen Raum mit diesem Link!");
        }
    });
  }

  render() {
    return (
      <HeaderBar {...this.props} title='Raum Erstellung' />
    );
  }
}