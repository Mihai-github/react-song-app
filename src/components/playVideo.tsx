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
          <View
            style={{
              marginTop: 0,
              height: Dimensions.get('window').height,
            }}>
            <WebView
              containerStyle={{
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
