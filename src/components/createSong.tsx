import * as React from 'react';
import {Box} from 'react-native-design-utility';
import {Button, StyleSheet, View, ActivityIndicator, Text} from 'react-native';
//@ts-ignore
import t from 'tcomb-form-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useMutation} from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';
import TimePicker from 'react-native-simple-time-picker';

import {CreateSongsMutation} from '../graphql';
import {useFocusEffect} from '@react-navigation/native';

const song = t.struct({
  title: t.String,
  artist: t.String,
  url: t.String,
  description: t.maybe(t.String),
});

const Form = t.form.Form;

const options = {
  fields: {
    url: {
      error: 'Url is required!',
    },
    title: {
      error: 'Ttitle is required!',
    },
    artist: {
      error: 'Artist is required!',
    },
  },
};

const createSong = ({navigation, route}) => {
  let form;

  const [createSongs] = useMutation(CreateSongsMutation);
  const [defaultSong, setDefaultSong] = React.useState({value: {}});
  const [timePicker, setTimePiker] = React.useState({
    selectedHours: 0,
    selectedMinutes: 0,
  });
  const routeParams = route.params;
  console.log(routeParams.title);
  //console.log(routeParams?.item.duration.split(':'));
  const setValues = React.useCallback(() => {
    if (routeParams.item) {
      setDefaultSong({
        value: {
          title: routeParams.item.title,
          url: routeParams.item.url,
          artist: routeParams.item.artist,
          type: routeParams.item.type,
          description: routeParams.item.description,
        },
      });
      //   let h = routeParams?.item.duration.split(':')[0];
      //   let m = routeParams?.item.duration.split(':')[1];
      //   setTimePiker({selectedHours: 12, selectedMinutes: 12});
    }
  }, [defaultSong]);

  React.useEffect(() => {
    setValues();
    //setTimePiker({selectedHours: 12, selectedMinutes: 12});
  }, [route]);

  const onChange = (value) => {
    setDefaultSong({value});
  };

  const handleSubmit = async () => {
    const value = form.getValue(); // use that ref to get the form value
    console.log(value, timePicker);
    try {
      await createSongs({
        variables: {
          song: {
            id: routeParams ? routeParams?.item?.id : '',
            title: value.title,
            artist: value.artist,
            url: value.url,
            type: routeParams.playListName
              ? routeParams.playListName
              : routeParams.item.type,
            description: value.description,
            duration:
              '' + timePicker.selectedHours + ':' + timePicker.selectedMinutes,
            playList: {
              connect: routeParams ? routeParams.item.playList.id : '',
            },
          },
        },
      });
      navigation.navigate('List');
    } catch (error) {
      console.log(error);
    }

    //console.log('value: ', value);
  };
  //console.log(routeParams.playListName);
  return (
    <>
      <Box style={styles.container}>
        <Box h={50}>
          <View style={{width: 120}}>
            <Icon.Button
              name="arrow-back"
              backgroundColor="#3b5998"
              onPress={() => navigation.navigate('PlayLists')}>
              Go Back
            </Icon.Button>
          </View>
        </Box>

        <ScrollView keyboardShouldPersistTaps="never">
          <Form
            ref={(c) => (form = c)} // assign a ref
            type={song}
            value={defaultSong.value}
            onChange={onChange}
            options={options}
          />
          <Text>Duration</Text>
          <TimePicker
            selectedHours={timePicker.selectedHours}
            selectedMinutes={timePicker.selectedMinutes}
            onChange={(hours, minutes) =>
              setTimePiker({selectedHours: hours, selectedMinutes: minutes})
            }
          />
          {routeParams.item.title ? (
            <Button title="Edit" onPress={handleSubmit} />
          ) : (
            <Button title="Create" onPress={handleSubmit} />
          )}
        </ScrollView>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    // marginTop: 50,
    height: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

export default createSong;
