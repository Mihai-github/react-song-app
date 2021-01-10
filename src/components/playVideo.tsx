import * as React from 'react';
import {Dimensions, Text, View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';

const playVideo = ({navigation, route}) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const routes = route.params;

  let parsedUrl = React.useMemo(() => {
    let newUrl = routes.url
      .substring(routes.url.indexOf('=') + 1)
      .split('=')
      .slice(0, 1)
      .toString();

    return newUrl;
  }, [routes]);

  console.log(
    routes.url,
    parsedUrl,
    'https://www.youtube.com/embed/' + parsedUrl,
  );

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  return (
    <View>
      {loading ? (
        <View>
          <ActivityIndicator
            style={{marginTop: 'auto'}}
            size="large"
            color="rgb(33, 150, 243)"
          />
        </View>
      ) : (
        <>
          {/* <View style={{width: 120, marginBottom: 100}}>
            <Icon.Button
              name="arrow-back"
              backgroundColor="#3b5998"
              onPress={() => navigation.navigate('List')}>
              Go Back
            </Icon.Button>
          </View> */}
          <View
            style={{
              marginTop: 0,
              height: Dimensions.get('window').height,
              //flex: 1,
              //justifyContent: 'center',
              //alignSelf: 'flex-start',
            }}>
            <WebView
              containerStyle={{
                // backgroundColor: 'red',
                position: 'relative',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              }}
              onLoad={() => {
                console.log('loading');
              }}
              allowsFullscreenVideo={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              originWhitelist={['*']}
              source={{uri: 'https://www.youtube.com/embed/' + parsedUrl}}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default playVideo;
