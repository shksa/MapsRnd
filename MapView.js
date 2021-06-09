import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import RNMapView, {Circle, Marker} from 'react-native-maps';

const DEFAULT_PADDING = {top: 100, right: 100, bottom: 100, left: 100};

const MapView = ({
  userCoords,
  atmCoords,
  cashbackCoords,
  surchargeFreeAtmCoords,
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    atmCoords.length > 0 &&
      mapRef.current.fitToCoordinates(
        [
          ...atmCoords,
          userCoords,
          ...cashbackCoords,
          ...surchargeFreeAtmCoords,
        ],
        {
          animated: true,
          edgePadding: DEFAULT_PADDING,
        },
      );
  }, [atmCoords, userCoords, cashbackCoords, surchargeFreeAtmCoords]);

  useEffect(() => {
    if (!!userCoords && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: userCoords.latitude,
          longitude: userCoords.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      });
    }
  }, [userCoords]);

  return (
    <View style={styles.container}>
      <RNMapView
        ref={mapRef}
        initialCamera={{
          altitude: 15000,
          center: {
            latitude: userCoords.latitude,
            longitude: userCoords.longitude,
          },
          heading: 0,
          pitch: 0,
          zoom: 15,
        }}
        loadingEnabled
        loadingBackgroundColor="white"
        style={StyleSheet.absoluteFillObject}
        rotateEnabled={false}>
        {!!userCoords && (
          <>
            <Marker
              anchor={{x: 0.5, y: 0.6}}
              coordinate={{
                latitude: userCoords.latitude,
                longitude: userCoords.longitude,
              }}
              flat
              style={{
                ...(userCoords.heading !== -1 && {
                  transform: [
                    {
                      rotate: `${userCoords.heading}deg`,
                    },
                  ],
                }),
              }}>
              <View style={styles.dotContainer}>
                <View style={[styles.arrow]} />
                <View style={styles.dot} />
              </View>
            </Marker>
            <Circle
              center={{
                latitude: userCoords.latitude,
                longitude: userCoords.longitude,
              }}
              radius={userCoords.accuracy}
              strokeColor="rgba(0, 150, 255, 0.5)"
              fillColor="rgba(0, 150, 255, 0.5)"
            />
            {atmCoords.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={coordinate}
                title={`bank ${index + 1}`}
              />
            ))}
            {cashbackCoords.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={coordinate}
                title={`cashback store ${index + 1}`}
                pinColor="#0000FF"
              />
            ))}
            {surchargeFreeAtmCoords.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={coordinate}
                title={`surcharge free atm ${index + 1}`}
                pinColor="#00FF00"
              />
            ))}
          </>
        )}
      </RNMapView>
    </View>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'rgb(0, 120, 255)',
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 4,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgb(0, 120, 255)',
  },
});
