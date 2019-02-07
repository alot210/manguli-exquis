import React from 'react';
import HeaderBar from "../components/HeaderBar";
import firebase from '../constants/FirebaseConfig';

export default class JoinRoomScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

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
      <HeaderBar {...this.props} title='Raum beitreten' />
    );
  }
}