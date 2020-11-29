import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../components/LoginScreen';
import PlayListsScreen from '../components/PlayListsScreen';
import MainTabNavigator from './MainTabNavigator';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen
        name="Tabs"
        component={MainTabNavigator}></MainStack.Screen>
      {/* <MainStack.Screen name="Login" component={LoginScreen}></MainStack.Screen> */}
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
