import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import MapView from './MapView';

export default function Map() {
  const [userCoords, setUserCoords] = useState(null);
  const [atmCoords, setAtmCoords] = useState([]);
  const [cashbackCoords, setCashbackCoords] = useState([]);
  const [surchargeFreeAtmCoords, setSurchargeFreeAtmCoords] = useState([]);

  const getUserLocation = async () => {
    setUserCoords({
      accuracy: 20,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 37.4219983,
      longitude: -122.084,
      speed: 0,
    });
  };

  const findATMs = async () => {
    try {
      setAtmCoords([
        {latitude: 37.3779488, longitude: -122.1146758},
        {latitude: 37.3979488, longitude: -122.0146758},
      ]);
      setCashbackCoords([
        {latitude: 37.4059488, longitude: -122.1146758},
        {latitude: 37.3879488, longitude: -122.0546758},
      ]);
      setSurchargeFreeAtmCoords([
        {latitude: 37.3729488, longitude: -122.0746758},
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {userCoords && (
        <MapView
          atmCoords={atmCoords}
          userCoords={userCoords}
          cashbackCoords={cashbackCoords}
          surchargeFreeAtmCoords={surchargeFreeAtmCoords}
        />
      )}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <Button title="Get Location" onPress={getUserLocation} />
            <Button title="Find ATMs" onPress={findATMs} />
          </View>
        </View>
        <View style={styles.result}>
          <Text>Latitude: {userCoords?.latitude || ''}</Text>
          <Text>Longitude: {userCoords?.longitude || ''}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    padding: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  result: {
    borderWidth: 1,
    borderColor: '#666',
    width: '100%',
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
});
