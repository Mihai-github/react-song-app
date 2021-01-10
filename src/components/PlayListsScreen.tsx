import * as React from 'react';
import {urls} from '../assets/index';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useQuery, useMutation} from '@apollo/client';

import {GetPlayListsQuery, DeletePlayListMutation} from '../graphql';
import {useFocusEffect} from '@react-navigation/native';

const PlayListsScrenn = ({navigation, LoginScreen, route}) => {
  const {data: item, loading, error, refetch} = useQuery(GetPlayListsQuery, {
    fetchPolicy: 'network-only',
  });
  const [deletePlayList] = useMutation(DeletePlayListMutation, {
    refetchQueries: [{query: GetPlayListsQuery}],
  });

  const handleDelete = (e) => {
    Alert.alert(
      'Delete PlayList',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deletePlayList({variables: {id: e}})},
      ],
      {cancelable: false},
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log(loading);
      refetch();
    }, [item]),
  );

  const renderItem = ({item: currentItem}) => {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 22, paddingBottom: 10}}>
            {currentItem.name}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            onLongPress={() => {
              navigation.navigate('playListSongs', {id: currentItem.id});
            }}
            onPress={() => {
              navigation.navigate('createPlayList', {id: currentItem.id});
            }}
            source={{uri: currentItem.imageUrl}}
            style={styles.imageStyling}
          />
        </View>
        <View
          style={{
            marginLeft: 90,
            marginRight: 90,
            paddingBottom: 10,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Icon.Button
            name="paint-brush"
            backgroundColor="#3cc3c1"
            style={{justifyContent: 'center'}}
            onPress={() =>
              navigation.navigate('createSong', {
                playListName: 'Music',
                item: {playList: {id: currentItem.id}},
              })
            }>
            Add
          </Icon.Button>
          <Icon.Button
            name="trash-o"
            backgroundColor="red"
            style={{justifyContent: 'center'}}
            onPress={() => {
              handleDelete(currentItem.id);
            }}
            //onLongPress={navigation.navigate('playListSongs')}
          >
            Delete
          </Icon.Button>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <FlatList
        data={item?.playList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Icon.Button
        name="paint-brush"
        backgroundColor="rgb(33, 150, 243)"
        style={{justifyContent: 'center', borderRadius: 0}}
        onPress={() => navigation.navigate('createPlayList')}>
        Create PlayList
      </Icon.Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  songList: {},
  imageStyling: {
    borderRadius: 30,
    width: 200,
    height: 150,
    marginBottom: 10,
  },
});

export default PlayListsScrenn;
