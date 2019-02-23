import React from 'react';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { View } from 'react-native';
import { Title } from 'native-base';

import HomeScreen from '../screens/HomeScreen';
import TutorialScreen from '../screens/TutorialScreen';
import CreditScreen from '../screens/CreditScreen';
import Colors from "../constants/Colors";
import StartScreen from "../screens/StartScreen";
import CreateRoomScreen from "../screens/CreateRoomScreen";
import JoinRoomScreen from "../screens/JoinRoomScreen";
import LoginScreen from '../screens/LoginScreen';
import SentenceStart from "../screens/SentenceStart";
import SentenceInput from "../screens/SentenceInput";
import SentenceWait from "../screens/SentenceWait";
import SentenceEnd from "../screens/SentenceEnd";
import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingsScreen";

const CostumDrawerComponent = (props) => (
  <View>
    <View style={{backgroundColor: Colors.primaryColor, height: 64, justifyContent: 'center', alignItems: 'center'}}>
      <Title style={{color: Colors.primaryTextColor, fontSize: 24, marginTop: 20}}>Menu</Title>
    </View>
    <DrawerItems {...props} />
  </View>
);

const AppDrawer = createDrawerNavigator({
  Lobby: StartScreen,
  CreateRoom: CreateRoomScreen,
  JoinRoom: JoinRoomScreen,
  Dashboard: DashboardScreen,
  Tutorial: {
    screen: (props) => <TutorialScreen {...props} userID={0} />,
  },
  Credits: {
    screen: (props) => <CreditScreen {...props} userID={0}/>,
  },
  Settings: SettingsScreen,
  GameStart: SentenceStart,
  GameInput: SentenceInput,
  GameWait: SentenceWait,
  GameEnd: SentenceEnd,
}, {
  contentComponent: CostumDrawerComponent,
  contentOptions: {
    activeTintColor: Colors.secondaryTextColor,
    activeBackgroundColor: Colors.secondaryColor,
    inactiveTintColor: Colors.primaryTextColor,
    itemsContainerStyle: {
      paddingVertical: 0,
    }
  }
});

const AuthDrawer = createDrawerNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
  Tutorial: TutorialScreen,
  Credits: CreditScreen,
}, {
  contentComponent: CostumDrawerComponent,
  contentOptions: {
    activeTintColor: Colors.secondaryTextColor,
    activeBackgroundColor: Colors.secondaryColor,
    inactiveTintColor: Colors.primaryTextColor,
    itemsContainerStyle: {
      paddingVertical: 0,
    }
  }
});

const loginNavigator = createSwitchNavigator({
  App: AppDrawer,
  Auth: AuthDrawer,
});

export default AppDrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  Tutorial: TutorialScreen,
  Credits: CreditScreen,
  Start: {
    screen: loginNavigator,
    navigationOptions: {
      drawerLabel: () => null,
      drawerLockMode: 'locked-closed',
    }
  },
  //Start: StartScreen,
  //Settings: SettingsScreen,
  //Dashboard: DashboardScreen,
  //CreateRoom: CreateRoomScreen,
  //JoinRoom: JoinRoomScreen,
  //Login: LoginScreen,
  //SentenceGame: SentenceStart,
  //SentenceInput: SentenceInput,
  //SentenceWait: SentenceWait,
  //SentenceEnd: SentenceEnd,
  //Dashboard: DashboardScreen,
}, {
  contentComponent: CostumDrawerComponent,
  contentOptions: {
    activeTintColor: Colors.secondaryTextColor,
    activeBackgroundColor: Colors.secondaryColor,
    inactiveTintColor: Colors.primaryTextColor,
    itemsContainerStyle: {
      paddingVertical: 0,
    }
  }
});