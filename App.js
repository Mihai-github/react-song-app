import 'react-native-gesture-handler';
import * as React from  'react';
import { UtilityThemeProvider } from 'react-native-design-utility';
import { NavigationContainer } from '@react-navigation/native';

import MainStackNavigator from './src/navigatiors/MainStackNavigator';
import { theme } from './src/constants/theme'

const App = () => {
    return (
        <UtilityThemeProvider theme={theme}>
            <NavigationContainer>
                <MainStackNavigator></MainStackNavigator>
            </NavigationContainer>
        </UtilityThemeProvider>
    );
}

export default App;