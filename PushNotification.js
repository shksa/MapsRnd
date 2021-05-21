import React, {Fragment} from 'react';
import PushController from './PushController';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
// Dummy data for list, we'll replace this with data received from push

const PushNotification = () => {
  return (
    <Fragment>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.listHeader}>
            <Text>Push Notifications</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <PushController />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {backgroundColor: Colors.lighter},
  listHeader: {backgroundColor: '#eee', color: '#222', height: 44, padding: 12},
  title: {fontSize: 18, fontWeight: 'bold', paddingTop: 10},
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  engine: {position: 'absolute', right: 0},
  body: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: {marginTop: 32, paddingHorizontal: 24},
  sectionTitle: {fontSize: 24, fontWeight: '600', color: Colors.black},
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {fontWeight: '700'},
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default PushNotification;
