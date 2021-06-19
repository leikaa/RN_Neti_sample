import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {THEME} from '../utils/theme';
import hexToRGBA from '../utils/helpers/HexToRGBA';
import MainScreen from '../containers/MainScreen';

const MainLayer = createStackNavigator({
    Main: MainScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: THEME.MENU_COLOR,
        elevation: 6,
        shadowOffset: {
          width: 2,
          height: 2
        },
        shadowColor: hexToRGBA(THEME.TEXT_COLOR, 0.4),
        shadowRadius: 2,
        shadowOpacity: 1,
      },
      headerTintColor: THEME.MAIN_COLOR,
    },
  },
);

export const AppNavigation = createAppContainer(MainLayer);
