import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Colors from '../constants/Colors';
import {Header, Left, Right, Icon, Body, Title, Container, Text} from 'native-base';
import HeaderBar from "../components/HeaderBar";

export default class CreditScreen extends React.Component {
    render() {
        return (
            <Container>
                <HeaderBar {...this.props} title='Credits'/>
                <SafeAreaView style={{flex: 1}}>
                    <Text style={{
                        alignSelf: 'center',
                        paddingBottom: 32,
                        paddingTop: 20,
                        color: Colors.primaryTextColor,
                        fontSize: 24
                    }}>Entwickler-Team</Text>
                    <Text style={{alignSelf: 'center', paddingBottom: 20}}>Christian Leich</Text>
                    <Text style={{alignSelf: 'center', paddingBottom: 20}}>Jens Römer</Text>
                    <Text style={{alignSelf: 'center', paddingBottom: 32}}>Alina Otten</Text>
                    <Text
                        style={{alignSelf: 'center', paddingBottom: 32, color: Colors.primaryTextColor, fontSize: 24}}>Betreuende
                        Professorin</Text>
                    <Text style={{alignSelf: 'center', paddingBottom: 20}}>Christina Karababa</Text>
                    <Text style={{alignSelf: 'center', paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>Das Projekt
                        "Manguli-Exquis" entstand im Rahmen des Moduls "Collaborative-Tools" an der Hochschule
                        Düsseldorf.</Text>
                </SafeAreaView>
            </Container>
        )
    }
}
