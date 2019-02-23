import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button} from 'native-base';
import firebase from '../constants/FirebaseConfig';

import HeaderBar from '../components/HeaderBar';

export default class SentenceWait extends React.Component {
  /*static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };*/

  constructor(props) {
    super(props);
    this.state = {
      playerSubmitedValue: 0,
    };

    this.roomMemberRef = firebase.database().ref('roomContent');
  }

  componentWillMount() {
    this.roomMemberRef.on('value', (snapshot) => {
      snapshot.forEach((item) => {
        if (item.child('roomID').val() === this.props.navigation.getParam('room_id')) {
          if(item.child('content').val() !== "") {
            this.setState({playerSubmitedValue: this.state.playerSubmitedValue + 1});
          }
        }

        if(this.props.navigation.getParam('playerSequence').length === this.state.playerSubmitedValue)
          this.props.navigation.navigate('GameEnd');
      });
    });
  }

  componentWillUnmount() {
    this.roomMemberRef.off();
  }

  render() {
    return (
      <Container>
        <HeaderBar {...this.props} title='Satzbau'/>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 64}}>
          <Text style={{alignSelf: 'center', paddingBottom: 32}}>Satzbau</Text>
          <Text style={{alignSelf: 'center', paddingLeft: 16, paddingRight: 16}}>
            Warte bis die anderen Fertig sind...
          </Text>
        </View>
      </Container>
    )
  }
}