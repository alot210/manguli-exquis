import React from 'react';
import HeaderBar from "../components/HeaderBar";

export default class CreateRoomScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  };
  render() {
    return (
      <HeaderBar {...this.props} title='Raum Erstellung' />
    );
  }
}