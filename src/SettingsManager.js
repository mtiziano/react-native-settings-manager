import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Button,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  ActionSheetIOS,
  TouchableOpacity,
} from 'react-native';

import { MaterialDialog, RadioButton } from 'react-native-material-experience';

import SettingView from './SettingView';

const prefix = '#sm_';
const getKey = (id) => prefix + id;

const setValue = (id, value) => {
  AsyncStorage.setItem(getKey(id), ''+value);
};

export const SettingsManager = (settings) => {
  // check integrity
  //if(!settings || !settings.list) console.err('SettingsManager: missing prop settings { list:[...] }');
  //if(settings.list.length===0) console.err('SettingsManager: empty list');

  return {
    View: ()=>(<SettingsManagerView settings={settings}/>),
    getValue: (id, handler) => {
      let defaultValue = settings[id].default;
      AsyncStorage.getItem(getKey('media')).then((value)=>{
        if(value!==null) handler(value);
        else handler(defaultValue);
      }).catch(err => handler(defaultValue)).done();
    },
    setValue,
  }
}

class SettingsManagerView extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      keys: Object.keys(this.props.settings),
    }
  }

  componentWillMount() {
    let smKeys = this.state.keys.map(item => getKey(item));
    AsyncStorage.multiGet(smKeys, (err, stores) => {
      let values = {};
      stores.map((result, i, store) => {
        let key = stores[i][0].substr(prefix.length);
        var value = stores[i][1];

        let setting = this.props.settings[key];

        if(value===null) value = setting.default;
        else if(value==='true' || value==='false') value = value === 'true';
        else if(!isNaN(value)) value = parseInt(value);

        if(setting.type==='picker' && !value) value = 0;

        values[key] = value;
      });
      this.setState({values});
    });
  }

  onValueChange(key, value) {
    let values = Object.assign({}, this.state.values);
    values[key] = value;
    this.setState({values});
    setValue(key, value);
    if(this.props.onValueChange) this.props.onValueChange(key, value);
  }

  renderSettings() {
    let keys = this.state.keys;
    return keys.map((key, index) => {
      let setting = this.props.settings[key];
      return (
        <SettingView
          key={key+index}
          value={this.state.values[key]}
          tintColor={this.props.tintColor}
          onPickerRequest={()=>{
            this.setState({
              pickerTitle: setting.title,
              pickerKey: key,
              pickerList: setting.list,
              pickerValue: this.state.values[key],
            }, ()=>{
              if (Platform.OS === 'ios') {
                this.showActionSheet();
              }
            })
          }
        }
          onValueChange={(value)=>this.onValueChange(key, value)}
          divider={index>0 && setting.group!==this.props.settings[keys[index-1]].group}
          {...setting}
        />
      )
    });
  }

  onPickerSelectedValue(value) {
    this.onValueChange(this.state.pickerKey, value);
    this.setState({pickerList:null});
  }

  showActionSheet() {
    console.log(this.state);
    let options = ['Cancel'];
    options.push(...this.state.pickerList);

    ActionSheetIOS.showActionSheetWithOptions({
      title: this.state.pickerTitle,
      options: options,
      //destructiveButtonIndex: this.state.pickerValue+1,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if (buttonIndex != 0) this.onPickerSelectedValue(buttonIndex-1);
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.scroller}>
          <View style={styles.content}>
            {this.renderSettings()}
          </View>
        </ScrollView>


        {Platform.OS === 'android' ?
        <MaterialDialog
          title={this.state.pickerTitle}
          visible={this.state.pickerList ? true : false}
          onRequestClose={()=>this.setState({pickerList:null})}
          actions={[{title:'CLOSE', onPress:()=>this.setState({pickerList:null})}]}
        >
          {this.state.pickerList ? (
            <ScrollView>
              <View style={styles.pickerContent}>
                {this.state.pickerList.map((item, index) => (
                  <RadioButton
                    key={index}
                    onValueChange={()=>this.onPickerSelectedValue(index)}
                    title={item}
                    tintColor='#009385'
                    value={index===this.state.pickerValue}
                  />
                ))}
              </View>
            </ScrollView>
          ) : null}
        </MaterialDialog>
        :
        null
      }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroller: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
  },
  pickerContent: {
    paddingVertical: 8,
  },
  pickerItem: {
    paddingHorizontal: 8,
    paddingVertical: 13,
    fontSize: 16,
    color: '#000000',
  },
});
