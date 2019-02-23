import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button} from 'native-base';
import firebase from '../constants/FirebaseConfig';

import HeaderBar from '../components/HeaderBar';

export default class SettingsScreen extends React.Component {
   static navigationOptions = {
     //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
     drawerLabel: () => null
   };

  logout(_that) {
      firebase.database().ref('user/' + _that.props.navigation.getParam('user_id')).update({
          islogged: false
      });

      _that.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Container>
        <HeaderBar {...this.props} title='Settings'/>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Button
            style={{alignSelf: 'center'}}
            onPress={ () => this.logout(this)}>
            <Text>Log Out</Text>
          </Button>
        </View>
      </Container>
    )
  }
}