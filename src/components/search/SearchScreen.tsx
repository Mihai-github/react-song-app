import React, {useEffect} from 'react';
import {Box, Text} from 'react-native-design-utility';
import {Input, Image} from 'react-native-elements';
import {StyleSheet, FlatList, View, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';
import {theme} from '../../constants/theme';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/client';

const SearchScreen = () => {
  //const {loading, error, data} = useQuery(GetSongsQuery);
  let url = 'https://www.youtube.com/watch?v=8zT6CYu0iYQ&t=924s';
  let newUrl = url
    .substring(url.indexOf('=') + 1)
    .split('=')
    .slice(0, 1)
    .toString();

  const DATA2 = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const renderItem = ({item}) => (
    <Box h={100} style={{flex: 1, marginLeft: 15, marginBottom: 15}}>
      <TouchableOpacity style={{}}>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}}
          style={{
            width: 100,
            height: 80,
            borderRadius: 25,
            marginLeft: 15,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          position: 'absolute',
          alignSelf: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          color: 'rgb(33, 150, 243)',
          marginTop: 15,
          textAlign: 'left',
          //paddingLeft: 55,
          //marginBottom: 15,
          textDecorationLine: 'underline',
        }}>
        John Doe
      </Text>
      <Text
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          fontSize: 12,
          fontWeight: 'bold',
          color: 'black',
          marginTop: 45,
          paddingLeft: 15,
          paddingRight: 35,
        }}>
        Descriere about the current music
      </Text>
    </Box>
  );
  return (
    <>
      {/* <View
        style={{
          height: 200,
          flex: 1,
          justifyContent: 'center',
          //alignSelf: 'flex-start',
        }}> */}
      {/* <WebView
        containerStyle={
          {
            // backgroundColor: 'red',
            // position: 'relative',
            //width: Dimensions.get('window').width,
            //height: Dimensions.get('window').height,
          }
        }
        onLoad={() => {
          console.log('loading');
        }}
        // allowsFullscreenVideo={true}
        // javaScriptEnabled={true}
        // domStorageEnabled={true}
        originWhitelist={['*']}
        source={{uri: 'https://www.youtube.com/embed/Eu0fg_-I3ME'}}
      /> */}
      {/* </View> */}
    </>
  );
};

const style = StyleSheet.create({
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});

export default SearchScreen;
