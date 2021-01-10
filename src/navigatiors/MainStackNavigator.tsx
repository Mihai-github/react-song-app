import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../components/LoginScreen';
import createSong from '../components/createSong';
import playVideo from '../components/playVideo';
import createPlayList from '../components/createPlayList';
import playListSongs from '../components/playListSongs';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen
        name="Tabs"
        options={{}}
        component={MainTabNavigator}></MainStack.Screen>
      <MainStack.Screen name="Login" component={LoginScreen}></MainStack.Screen>
      <MainStack.Screen
        name="createSong"
        component={createSong}></MainStack.Screen>
      <MainStack.Screen
        name="playVideo"
        component={playVideo}></MainStack.Screen>
      <MainStack.Screen
        name="createPlayList"
        component={createPlayList}></MainStack.Screen>
      <MainStack.Screen
        name="playListSongs"
        component={playListSongs}></MainStack.Screen>
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
