import * as React from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {Box} from 'react-native-design-utility';
//@ts-ignore
import t from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useMutation, useQuery} from '@apollo/client';

import {
  CreatePlayListMutation,
  GetCurrentPlayList,
  GetPlayListsQuery,
} from '../graphql';

const playList = t.struct({
  name: t.String,
  imageUrl: t.String,
});

const Form = t.form.Form;

const options = {
  fields: {
    imageUrl: {
      error: 'Url is required!',
    },
    name: {
      error: 'Name is required!',
    },
  },
};

const createPlayList = ({navigation, route}) => {
  let form;
  const [defaultPlayList, setDefaultPlayList] = React.useState({value: {}});
  const [createPlayList] = useMutation(CreatePlayListMutation);
  const {data, loading, error, refetch, called} = useQuery(GetCurrentPlayList, {
    variables: {id: route?.params?.id},
  });

  React.useEffect(() => {
    if (data) {
      setValues();
    }
    //console.log(data);
  }, [data]);

  const setValues = React.useCallback(() => {
    setDefaultPlayList({
      value: {
        name: data.getPlayList?.name,
        imageUrl: data.getPlayList?.imageUrl,
      },
    });
  }, [data]);

  const handleSubmit = () => {
    const value = form.getValue(); // use that ref to get the form value

    try {
      createPlayList({
        variables: {
          playList: {
            id: route.params ? route.params.id : '',
            name: value.name,
            imageUrl: value.imageUrl,
          },
        },
      });
      navigation.navigate('PlayLists');
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (value) => {
    setDefaultPlayList({value});
  };
  return (
    <View>
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
            type={playList}
            value={defaultPlayList.value}
            onChange={onChange}
            options={options}
          />
          <Button title="Create" onPress={handleSubmit} />
        </ScrollView>
      </Box>
    </View>
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

export default createPlayList;
