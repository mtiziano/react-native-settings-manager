import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Button,
} from 'react-native';
import { SettingsManager } from 'react-native-settings-manager';
import { AppSettings } from './Settings';

export default class Home extends Component<{}> {

  static navigationOptions = {
    title: 'Settings Manager Example'
  }

  state = {}

  componentDidMount() {
    this.loadValues();
  }

  async loadValues() {
    this.setState({
      volume: await AppSettings.getValueAsync('volume'),
      ringtone: await AppSettings.getValueAsync('ringtone'),
      vibrate: await AppSettings.getValueAsync('vibrate'),
    });
  }

  openSettings = () => {
    this.props.navigation.navigate("Settings", {
      onValueChange: this.onValueChange
    })
  }

  onValueChange = (key) => {
    AppSettings.getValue(key, (value) => this.setState({ [key]: value }));
  }

  renderValues() {
    let values = [];
    for (var key in this.state) {
      values.push(
        <View style={styles.valueContainer} key={key}>
          <Text style={styles.key} children={key} />
          <Text children={this.state[key]} />
        </View>
      );
    }
    return values;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title} children="Welcome to Settings Manager example project" />
          <Button onPress={this.openSettings} title={'Open Settings'}></Button>
          {this.renderValues()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    margin: 16,
  },
  title: {
    textAlign: 'center',
  },
  valueContainer: {
    paddingVertical: 8,
  },
  key: {
    fontWeight: 'bold'
  },
});