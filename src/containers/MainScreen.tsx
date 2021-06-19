import React from 'react';
import {Text, View} from 'react-native';

const MainScreen = () => {

  return (
    <View>
      <Text>
        Main screen
      </Text>
    </View>
  )
}

MainScreen.navigationOptions = () => ({
  title: 'Меню'
});

export default MainScreen;
