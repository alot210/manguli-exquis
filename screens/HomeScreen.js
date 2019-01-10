import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Colors from '../constants/Colors';
import {Header, Left, Right, Icon, Body, Title, Container, Content, Button, Text} from 'native-base';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <Container>
                <Header style={{backgroundColor: Colors.primaryColor}}>
                    <StatusBar barStyle='light-content'/>
                    <Left>
                        <Icon style={{color: Colors.primaryTextColor}} name="menu"
                              onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                    <Body style={{flex: 2}}>
                    <Title style={{color: Colors.primaryTextColor, fontSize: 24}}>Manguli Exquis</Title>
                    </Body>
                    <Right/>
                </Header>

                <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
                    <Button primary style={{
                        backgroundColor: Colors.primaryColor,
                        alignSelf: 'center',
                        marginBottom: 10,
                        width: 100
                    }} onPress={ () => this.props.navigation.navigate('Start') }>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Start</Text>
                    </Button>
                    <Button primary style={{
                        backgroundColor: Colors.primaryColor,
                        alignSelf: 'center',
                        marginBottom: 10,
                        width: 100
                    }} onPress={  () => this.props.navigation.navigate('Tutorial')}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Tutorial</Text>
                    </Button>
                    <Button primary style={{
                        backgroundColor: Colors.primaryColor,
                        alignSelf: 'center',
                        marginBottom: 10,
                        width: 100
                    }} onPress={ () => this.props.navigation.navigate('Credits')}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Credits</Text>
                    </Button>
                </SafeAreaView>

            </Container>
        );
    }
}
