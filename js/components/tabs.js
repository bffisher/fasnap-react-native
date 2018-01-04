import { TabNavigator } from 'react-navigation';
import HomeScreen from './home/home';
import ListScreen from './list/index';
import SetupScreen from './setup/setup';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    List: {
      screen: ListScreen
    },
    Setup: {
      screen: SetupScreen
    }
  },
  {
    tabBarPosition: 'bottom',
  }
);