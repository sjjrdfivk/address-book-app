/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TextInput,
  BackHandler,
} from 'react-native';

import Contacts from 'react-native-contacts';
import RNExitApp from 'react-native-exit-app';

function App(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');

  const image = require('./assets/image.jpg');

  const onPress = () => {
    setModalVisible(true);
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: '此应用程序希望查看您的联系人.',
      buttonPositive: '请接受',
    }).then(() =>
      Contacts.getAll()
        .then(contacts => {
          console.log(contacts);
          setModalVisible(true);
        })
        .catch(() => {}),
    );
  };

  const onSubmit = () => {
    RNExitApp.exitApp();
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={image} style={styles.background}>
        <TouchableOpacity
          style={styles.center}
          onPress={onPress}
          activeOpacity={1}></TouchableOpacity>
      </ImageBackground>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        hardwareAccelerated>
        <View style={styles.WRAPPER}>
          <View style={styles.MASK}></View>
          <View style={styles.CONTAINER}>
            <View style={styles.HEAD_TITLE_CLOSE}>
              <Text style={styles.HEAD_TITLE_TEXT}>邀请码</Text>
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setValue(text)}
              value={value}
            />
            <TouchableOpacity style={styles.submit} onPress={onSubmit}>
              <Text style={styles.submitText}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  center: {
    flex: 1,
  },
  submit: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2470E2',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  submitText: {
    fontSize: 18,
    color: '#fff',
  },
  textInput: {
    marginHorizontal: 20,
    height: 40,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  MASK: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: 0.2,
  },
  HEAD_TITLE_CLOSE: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 30,
    backgroundColor: '#2986FD',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  HEAD_TITLE_TEXT: {
    fontSize: 16,
    color: '#fff',
  },
  CONTAINER: {
    position: 'relative',
    width: 300,
    minHeight: 160,
    paddingBottom: 98,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 11,
  },
  WRAPPER: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default App;
