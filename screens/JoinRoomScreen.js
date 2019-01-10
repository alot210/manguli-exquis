import React from 'react';
import HeaderBar from "../components/HeaderBar";

export default class JoinRoomScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  };
  render() {
    return (
      <HeaderBar {...this.props} title='Raum beitreten' />
    );
  }
}