import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getLocation} from './geoLocation';
import MapView from './MapView';

export default function Maps() {
  const [userCoords, setUserCoords] = useState(null);
  const [atmCoords, setAtmCoords] = useState([]);

  const getUserLocation = async () => {
    const userGeoLocation = await getLocation();
    setUserCoords(userGeoLocation);
  };

  const findATMs = async () => {
    const {latitude, longitude} = userCoords;
    try {
      const {results} = await (
        await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${5000}&type=atm&keyword=comerica&key=AIzaSyAt6WnqjdGtQu35WWo3iOoAwpPFuxoB9p4`,
        )
      ).json();
      const atmLocations = results.map(
        ({
          geometry: {
            location: {lat, lng},
          },
        }) => ({latitude: lat, longitude: lng}),
      );
      setAtmCoords(atmLocations);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {userCoords && <MapView atmCoords={atmCoords} userCoords={userCoords} />}

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
