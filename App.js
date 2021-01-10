import 'react-native-gesture-handler';
import * as React from  'react';
import { UtilityThemeProvider } from 'react-native-design-utility';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import {WebView} from 'react-native-webview';

import MainStackNavigator from './src/navigatiors/MainStackNavigator';
import { theme } from './src/constants/theme'
import { client } from './src/services/graphql'

const App = () => {
    // React.useEffect( () => {
    //     (async () => {
    //         await TrackPlayer.setupPlayer().then(() => {
    //             console.log('player is done')
    //         });
    //         TrackPlayer.registerPlaybackService(() => trackPlayerServices);
    //         await TrackPlayer.add([track]);
    //         await TrackPlayer.play()
    //         setTimeout(() => {
    //             TrackPlayer.stop()
    //         }, 1000)
        
    //     })();
    // }, []);

    return (
        <ApolloProvider client={client}>
      <UtilityThemeProvider theme={theme}>
                    <NavigationContainer>
                        <MainStackNavigator></MainStackNavigator>
                    </NavigationContainer>
            </UtilityThemeProvider>
        </ApolloProvider>
    );
}

export default App;