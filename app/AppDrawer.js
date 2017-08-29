/**
 * Created by looper on 2017/8/29.
 */
import Main from './containers/Main';
import Profile from './containers/Profile';
import { DrawerNavigator } from 'react-navigation';

const AppDrawer = DrawerNavigator({
  Main: {
    screen: Main
  },
  Profile: {
    screen: Profile
  },
},{
  initialRouteName:'Main',
})

export default AppDrawer