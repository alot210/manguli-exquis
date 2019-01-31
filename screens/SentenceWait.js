import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button} from 'native-base';

import HeaderBar from '../components/HeaderBar';

export default class SentenceWait extends React.Component {
  /*static navigationOptions = {
    //Drawer Label ist null, damit es im DrawerMenü nicht angezeigt wird
    drawerLabel: () => null
  };*/
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