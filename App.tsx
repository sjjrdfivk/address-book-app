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
  TextInput
} from 'react-native';


import Contacts from 'react-native-contacts';



function App(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false)
  const [value, setValue] = useState("")

  const image = { uri: require("./assets/image.jpg") };

  useEffect(() => {
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    //   title: 'Contacts',
    //   message: '此应用程序希望查看您的联系人.',
    //   buttonPositive: '请接受',
    // }).then(() =>
    //   Contacts.getAll()
    //     .then(contacts => {
    //       console.log(contacts);
    //     })
    //     .catch(() => {}),
    // );
  }, []);

  const onPress = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: '此应用程序希望查看您的联系人.',
      buttonPositive: '请接受',
    }).then(() =>
      Contacts.getAll()
        .then(contacts => {
          console.log(contacts);
          setModalVisible(true)
        })
        .catch(() => {}),
    );
  }


  return (
    <SafeAreaView>
      <ImageBackground source={image} style={styles.background}>
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
        </TouchableOpacity>
      </ImageBackground>
      <Modal visible={modalVisible}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setValue(text)}
          value={value}
        />
        <TouchableOpacity style={styles.submit}>
          <Text style={styles.submitText}>确定</Text> 
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  center: {
    flex: 1,
  },
  submit: {
    width: 80,
    height: 40,
    backgroundColor: "#2470E2"
  },
  submitText: {
    color: "#fff"
  },
  textInput: {
    height: 40,
    borderColor: 'gray', 
    borderWidth: 1
  }
});

export default App;
