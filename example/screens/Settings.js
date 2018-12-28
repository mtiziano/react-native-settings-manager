import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { SettingsManager } from 'react-native-settings-manager';

export const AppSettings = SettingsManager({
  volume: {
    title: 'Ring volume',
    type: 'slider',
    default: 80, // from 0 to 100
    icon: require('../img/ic_notifications.png'),
  },
  ringtone: {
    title: 'Ringtone',
    type: 'picker',
    list: ['Default', 'Chime', 'Ring', 'Zion'],
  },
  vibrate: {
    title: 'Vibration',
    subtitle: 'Also vibrate for calls',
    type: 'switch',
    default: true,
  },
});

export default class SettingsScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Settings'
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AppSettings.View onValueChange={this.props.navigation.state.params.onValueChange}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});