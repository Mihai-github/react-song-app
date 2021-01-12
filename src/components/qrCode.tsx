import * as React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import {useMutation} from '@apollo/client';

import {CreateQrCodeMutation} from '../graphql';
const qrCode = ({route, navigation}) => {
  let svg;

  const [createCode] = useMutation(CreateQrCodeMutation);

  console.log({test: route.params.qrCode.url});
  let parsedUrl = React.useMemo(() => {
    let newUrl = route?.params?.qrCode?.url
      .substring(route?.params?.qrCode?.url.indexOf('=') + 1)
      .split('=')
      .slice(0, 1)
      .toString();

    return newUrl;
  }, [route]);

  console.log(parsedUrl);
  const getDataURL = () => {
    svg.toDataURL(callback);
  };

  const callback = (dataURL) => {
    try {
      createCode({
        variables: {
          play_list_id: route?.params?.qrCode?.playList?.id,
          song_id: route?.params?.qrCode?.id,
          qrCode: dataURL,
        },
      });
      navigation.navigate('List');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{paddingBottom: 10}}>Watch current song on Youtube</Text>
      <QRCode
        size={150}
        value={'https://www.youtube.com/watch?v=' + parsedUrl}
        getRef={(c) => (svg = c)}
      />
      <TouchableOpacity onPress={() => getDataURL()}>
        <Text style={{paddingTop: 30, fontSize: 18, color: 'blue'}}>
          Save QRCode
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default qrCode;
