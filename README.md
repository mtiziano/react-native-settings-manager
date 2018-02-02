
# react-native-settings-manager

## Getting started

`$ npm install react-native-settings-manager --save`

### Mostly automatic installation

`$ react-native link react-native-settings-manager`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-settings-manager` and add `RNSettingsManager.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNSettingsManager.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNSettingsManagerPackage;` to the imports at the top of the file
  - Add `new RNSettingsManagerPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-settings-manager'
  	project(':react-native-settings-manager').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-settings-manager/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-settings-manager')
  	```


## Usage
```javascript
import RNSettingsManager from 'react-native-settings-manager';

// TODO: What to do with the module?
RNSettingsManager;
```
  