
# react-native-settings-manager

## Getting started

`$ npm install react-native-settings-manager --save`

## Usage
```javascript
import { SettingsManager } from 'react-native-settings-manager';

export const AppSettings = SettingsManager({
  volume: {
    title: 'Ring volume',
    type: 'slider',
    default: 80, // from 0 to 100
    icon: require('./img/ic_notifications.png')
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
    default: true
  },
});
```

## Render component

```javascript
class SettingsScreen extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
	  
        <AppSettings.View/>
		
      </View>
    );
  }
}
```

<img src="https://github.com/numez/react-native-settings-manager/blob/master/img/settings.png" width="320"/>

## Retrive setting

```javascript
AppSettings.getValue('volume', (value) => {
  console.log('Volume: ' + value);
  // do stuff
});
```
