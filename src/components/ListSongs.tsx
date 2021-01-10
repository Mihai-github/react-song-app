import React, {useState, useMemo, useEffect} from 'react';
import {Box, Text} from 'react-native-design-utility';
import {Image, Card} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useQuery, useMutation, useLazyQuery} from '@apollo/client';

import {GetSongsQuery, DeleteSongMutation} from '../graphql';

const ListSongs = ({route, navigation}) => {
  //const {name} = route.params;
  //console.log(route.name);
  const [items, setItems] = useState([]);
  const {data: songData, loading, error, refetch} = useQuery(GetSongsQuery, {
    fetchPolicy: 'network-only',
  });
  //   const [songs, {loading, data: songData}] = useLazyQuery(GetSongsQuery);
  //   const isFocused = useIsFocused();

  const [deleteSong] = useMutation(DeleteSongMutation, {
    refetchQueries: [{query: GetSongsQuery}],
  });

  const deleteElement = (item) => {
    // console.log(item);
    deleteSong({
      variables: {
        id: item.id,
      },
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log(songData?.songs);
      refetch();
      setItems(songData?.songs);
    }, [songData]),
  );

  //   useEffect(() => {
  //     songs();
  //     setItems(songData?.songs);

  //     console.log(songData, loading);
  //   }, [songData, navigation]);

  return (
    <>
      {loading ? (
        <View style={[style.container, style.horizontal]}>
          <ActivityIndicator size="large" color="rgb(33, 150, 243)" />
        </View>
      ) : (
        <ScrollView style={{backgroundColor: '#fff', paddingTop: 20}}>
          <Box w="100%">
            <Card containerStyle={style.input}>
              <Card.Title style={{color: 'black', fontSize: 18}}>
                List of songs available
              </Card.Title>
              <Card.Divider />
              <FlatList
                style={{}}
                data={items}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => (
                  <Box style={{marginBottom: 20}}>
                    <Box
                      h={100}
                      style={{
                        flex: 1,
                        marginLeft: 15,
                        flexDirection: 'column',
                      }}>
                      <TouchableOpacity style={{}}>
                        <Image
                          source={{uri: 'https://via.placeholder.com/150'}}
                          style={{
                            width: 100,
                            height: 80,
                            borderRadius: 25,
                          }}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          position: 'absolute',
                          alignSelf: 'flex-end',
                          fontSize: 13,
                          fontWeight: 'bold',
                          color: 'rgb(33, 150, 243)',
                          marginTop: 15,
                          paddingLeft: 15,
                          //marginBottom: 15,
                          textDecorationLine: 'underline',
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          position: 'absolute',
                          justifyContent: 'center',
                          alignSelf: 'flex-end',
                          fontSize: 13,
                          fontWeight: 'bold',
                          color: 'black',
                          marginTop: 45,
                          paddingLeft: 15,
                          //paddingRight: 10,
                        }}>
                        Artist : {item.artist}
                      </Text>
                    </Box>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                      Duration: {item.duration}
                    </Text>
                    <Box>
                      <Icon.Button
                        name="edit"
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                        }}
                        backgroundColor="green"
                        onPress={() => {
                          navigation.navigate('createSong', {item});
                        }}>
                        Edit
                      </Icon.Button>
                      <Icon.Button
                        name="trash-o"
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                        }}
                        backgroundColor="red"
                        onPress={() => {
                          deleteElement(item);
                        }}>
                        Delete
                      </Icon.Button>
                    </Box>
                    <View>
                      <TouchableOpacity>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'blue',
                            paddingTop: 10,
                          }}
                          onPress={() =>
                            navigation.navigate('playVideo', {url: item.url})
                          }>
                          Watch YT video
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Box>
                )}
              />
            </Card>
          </Box>
        </ScrollView>
      )}
    </>
  );
};

const style = StyleSheet.create({
  input: {
    flex: 1,
    marginBottom: 25,
    marginLeft: 25,
    marginRight: 25,
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: '100%',
    //paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
});

const styles = StyleSheet.create({});

export default ListSongs;
{
  /*  */
}
