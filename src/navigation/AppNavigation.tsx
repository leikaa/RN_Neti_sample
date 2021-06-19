import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {THEME} from '../utils/theme';
import MainScreen from '../containers/MainScreen';

const MainLayer = createStackNavigator({
    Main: MainScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: THEME.MENU_COLOR,
      },
      headerTintColor: THEME.MAIN_COLOR,
    },
  },
);

export const AppNavigation = createAppContainer(MainLayer);
