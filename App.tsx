import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'mobx-react';

import {THEME} from './src/utils/theme';
import {AppNavigation} from './src/navigation/AppNavigation';

import {stores} from './src/store';

const App = () => (
  <Provider {...stores}>
    <View style={styles.container}>
      <StatusBar backgroundColor={THEME.MENU_COLOR} barStyle='dark-content'/>
      <AppNavigation/>
    </View>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND_COLOR,
  },
});

export default App;
