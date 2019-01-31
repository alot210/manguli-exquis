import React from 'react';
import { View } from 'react-native';
import { Container, Text, Button} from 'native-base';

import HeaderBar from '../components/HeaderBar';

export default class SentenceEnd extends React.Component {
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
          <Text style={{alignSelf: 'center', paddingLeft: 16, paddingRight: 16, paddingBottom: 16}}>
            Der Satz lautet:
          </Text>
          <Text style={{alignSelf: 'center'}}>
            Lorem ipsum.......
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Button
            style={{alignSelf: 'center'}}
            onPress={ () => this.props.navigation.navigate('Dashboard')}>
            <Text>Zum Dashboard</Text>
          </Button>
        </View>
      </Container>
    )
  }
}