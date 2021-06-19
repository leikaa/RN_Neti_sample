import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';

import {THEME} from './src/utils/theme';
import {AppNavigation} from './src/navigation/AppNavigation';

const App = () => (
  <View style={styles.container}>
    <StatusBar backgroundColor={THEME.MENU_COLOR} barStyle='dark-content'/>
    <AppNavigation/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND_COLOR,
  },
});

export default App;
