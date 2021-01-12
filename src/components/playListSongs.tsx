import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import {useQuery, useMutation} from '@apollo/client';

import {GetPlayListSongs, CreateSongsMutation} from '../graphql';
import {useFocusEffect} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const playListSongs = ({navigation, route}) => {
  const {data, loading, error, refetch} = useQuery(GetPlayListSongs, {
    variables: {id: route?.params?.playList?.id},
    fetchPolicy: 'network-only',
  });
  const [createSong] = useMutation(CreateSongsMutation);

  const removeSong = React.useCallback((e) => {
    console.log(e.id);
    try {
      createSong({
        variables: {
          song: {
            id: e?.id,
            title: e.title,
            artist: e.artist,
            type: e.type,
            url: e.url,
            description: e.description,
            duration: e.duration,
            playList: {
              disconnect: true,
            },
          },
        },
      });
      navigation.navigate('PlayLists');
    } catch (error) {}
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [data]),
  );

  return (
    <View>
      <View style={{marginBottom: 30}}>
        <Image
          source={{
            uri: route?.params?.playList?.imageUrl,
          }}
          style={{
            height: 150,
            width: 150,
            borderRadius: 50,
            marginLeft: 120,
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

            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('playVideo', {url: item.url});
                }}>
                <Text
                  style={{color: 'blue', textAlign: 'center', fontSize: 16}}>
                  {item.url}
                </Text>
              </TouchableOpacity>
            </>
            {/* <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('createPlayList', {
                    selectedPlayList: route?.params?.playList,
                  })
                }>
                <Text
                  style={{color: 'green', textAlign: 'center', fontSize: 16}}>
                  Add new song
                </Text>
              </TouchableOpacity>
            </> */}
            <>
              <TouchableOpacity onPress={() => removeSong(item)}>
                <Text style={{color: 'red', textAlign: 'center', fontSize: 16}}>
                  Remove
                </Text>
              </TouchableOpacity>
            </>
            <Divider></Divider>
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
};

export default playListSongs;
