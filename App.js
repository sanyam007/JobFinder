import React from 'react';
import Expo, {Notifications} from 'expo';
import { StyleSheet, View, StatusBar, Alert } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, Card, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import registerForNotifications from './services/push_notification';
import AuthScreen from './Screens/AuthScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import MapScreen from './Screens/MapScreen';
import DeckScreen from './Screens/DeckScreen';
import SettingScreen from './Screens/SettingScreen';
import ReviewScreen from './Screens/ReviewScreen';
import { Provider } from 'react-redux';
import store from './store';


  const MainNavigator = createBottomTabNavigator({
    welcome: {screen: WelcomeScreen},
    auth: {screen : AuthScreen},
    main: {
      screen: createBottomTabNavigator({
        map: {screen : MapScreen },
        deck: {screen : DeckScreen},
        review:{
          screen: createStackNavigator({
            reviewJob: {screen : ReviewScreen },
            settings: {screen : SettingScreen }
          },
          {
            navigationOptions: { title: 'Liked Jobs',tabBarIcon:({tintColor}) => {
            return <Icon name="favorite" size={30} color={tintColor} />    }
          }
          })
        }
      },{
        navigationOptions: {tabBarVisible: false},
        tabBarPosition: 'bottom' 
      })
    }
  },{
    lazyLoad: true
  });
  

const AppNavigation = createAppContainer(MainNavigator);


export default class App extends React.Component {
  async componentDidMount(){
    await registerForNotifications();
    Notifications.addListener((notification) => {
      console.log("n");
      const {data: {text}, origin} = notification;
      if(origin === 'received' && text){
        Alert.alert(
          'New Push Notification',
          text,
          [{text: 'Ok.'}]
        );
      }
    });
  }
  render() {
    return (
        <>
        <Provider store={store}>
          <View style={styles.statusBar}>
            <StatusBar
              translucent
              backgroundColor="#00BCD4"
              barStyle="light-content"
            />
          </View>
          <AppNavigation />
          </Provider>
        </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar:{
    backgroundColor: '#00BCD4',
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  }

});



// export default createAppContainer(MainNavigator);
