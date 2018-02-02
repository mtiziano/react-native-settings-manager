import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  Slider,
  Button,
  FlatList,
  PixelRatio,
  ScrollView,
  TouchableOpacity,
  RuntimeException,
} from 'react-native';

import { TouchableRipple } from 'react-native-material-navigation';

// wip - implement tintColor

// picker slider switch
export default class SettingView extends Component<{}> {
  constructor(props) {
    super(props);

    // check integrity
    if(!props.type) console.err('SettingsManager: missing prop "type" to setting');

    if(props.type==='picker' && !props.list)
      console.err('SettingsManager: missing prop "list" for type "picker" to setting');

  }

  onPress() {
    switch(this.props.type) {
      case 'switch':
        this.props.onValueChange(!this.props.value);
        break;
      case 'picker':
        this.props.onPickerRequest();
        break;
    }
  }

  renderController() {
    let tintColor = this.props.tintColor;
    let onTintColor = null; // tintColor with opacity

    switch(this.props.type) {
      case 'slider':
        return (
          <Slider
            style={{paddingTop:16}}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={this.props.value}
            onSlidingComplete={(value)=>this.props.onValueChange(value)}
          />
        );
      case 'switch':
        return (
          <Switch
            ref='switch'
            style={{marginHorizontal:16, marginTop:0, marginBottom:8}}
            value={this.props.value}
            onValueChange={(value)=>this.props.onValueChange(value)}

            tintColor="#dadada"
            thumbTintColor={this.props.value ? tintColor : "#ffffff"}
            onTintColor={onTintColor}
          />
        );
    }
    return null;
  }

  render() {
    let subtitle = this.props.subtitle;
    if(this.props.type==='picker') subtitle = this.props.list[this.props.value];

    const Touchable = (props)=>{return this.props.type !== 'slider' ? <TouchableRipple {...props}/> : <View {...props}/>}

    return (
      <View style={this.props.divider ? styles.divider : null}>
        {this.props.divider && isNaN(this.props.group) ? <Text style={styles.header}>{this.props.group}</Text> : null}
        <Touchable onPress={this.onPress.bind(this)}>
          <View style={styles.container}>
            <View style={styles.iconCol}>
              <Image style={styles.icon} source={this.props.icon}/>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.title}>{this.props.title}</Text>
              {(subtitle && this.props.type!=='slider') ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
              {this.props.type==='slider' ? this.renderController() : null}
            </View>
            {this.props.type!=='slider' ? this.renderController() : null}
          </View>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 8,
  },
  header: {
    paddingRight: 24,
    paddingLeft: 72,
    color: '#009385',
    fontSize: 12,
    marginTop: 8,
    fontWeight: 'normal',
    fontFamily: Platform.OS==='ios' ? null : 'sans-serif-medium',
  },
  divider: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#c7c7c7',
    marginTop: 8,
    paddingTop: 8,
  },
  iconCol: {
    width: 24,
    height: 24,
    marginHorizontal: 12,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#757575',
  },
  infoCol: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#000000',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    //paddingVertical: 8,
    paddingVertical: 0,
  },
  subtitle: {
    fontSize: 14,
    color: '#656565',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    //marginTop: -1.5,
    paddingVertical: 0,
    paddingBottom: 8,
  },
});
