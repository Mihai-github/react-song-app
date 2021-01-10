import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import {useQuery} from '@apollo/client';

import {GetPlayListSongs} from '../graphql';
import {useFocusEffect} from '@react-navigation/native';

const playListSongs = ({navigation, route}) => {
  const {data, loading, error, refetch} = useQuery(GetPlayListSongs, {
    variables: {id: route?.params?.id},
    fetchPolicy: 'network-only',
  });
  console.log(route);
  useFocusEffect(
    React.useCallback(() => {
      console.log(data);
      refetch();
    }, [data]),
  );

  return (
    <View>
      <View style={{marginBottom: 30}}>
        <Image
          source={{
            uri: 'https://images.shulcloud.com/719/uploads/Icons/song.png',
          }}
          style={{
            height: 150,
            width: 150,
            marginLeft: 130,
            marginTop: 20,
          }}
        />
        <Text style={{textAlign: 'center', fontSize: 26, fontWeight: 'bold'}}>
          Rock
        </Text>
      </View>
      <FlatList
        data={data?.playListSongs}
        renderItem={({item}) => (
          <View style={{}}>
            <Divider />
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
              Title: {item.title}
            </Text>
            <Text style={{textAlign: 'center', fontSize: 16}}>
              Artist: {item.artist}
            </Text>
            <Text style={{textAlign: 'center', fontSize: 15}}>
              YT link: <Text style={{color: 'blue'}}>{item.url}</Text>
            </Text>
            <Divider></Divider>
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
};

export default playListSongs;
