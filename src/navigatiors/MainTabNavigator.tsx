import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import PlayListsScrenn from '../components/PlayListsScreen';
import SearchScrenn from '../components/search/SearchScreen';
import {TouchableOpacity, View, Text} from 'react-native';

const MainTab = createBottomTabNavigator();
const Nav = createStackNavigator();

const PlayListsStackNavigator = () => {
  return (
    <Nav.Navigator>
      <Nav.Screen
        options={{title: 'All our play lists'}}
        name="PlayLists"
        component={PlayListsScrenn}
      />
    </Nav.Navigator>
  );
};

const SearchStackNavigator = () => {
  return (
    <Nav.Navigator>
      <Nav.Screen name="Search" component={SearchScrenn} />
    </Nav.Navigator>
  );
};

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#3cc3c1',
        paddingHorizontal: 25,
        height: 50,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <MainTab.Screen
        options={{
          title: 'PlayLists',
        }}
        name="PlayLists"
        component={PlayListsStackNavigator}></MainTab.Screen>
      <MainTab.Screen
        name="Search"
        component={SearchStackNavigator}></MainTab.Screen>
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
