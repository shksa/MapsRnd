import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import RNMapView, { Circle, Marker } from 'react-native-maps';

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 }

const MapView = ({ coords, atmCoords }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    atmCoords.length > 0 && mapRef.current.fitToCoordinates(atmCoords, {animated: true, edgePadding: DEFAULT_PADDING})
  }, [atmCoords])

  return (
    <View style={styles.container}>
      <RNMapView
        ref={mapRef}
        initialCamera={{
          altitude: 15000,
          center: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          heading: 0,
          pitch: 0,
          zoom: 15,
        }}
        loadingEnabled
        loadingBackgroundColor="white"
        style={StyleSheet.absoluteFillObject}
        rotateEnabled={false}
      >
        {!!coords && (
          <>
            <Marker
              anchor={{ x: 0.5, y: 0.6 }}
              coordinate={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
              flat
              style={{
                ...(coords.heading !== -1 && {
                  transform: [
                    {
                      rotate: `${coords.heading}deg`,
                    },
                  ],
                }),
              }}
            >
              <View style={styles.dotContainer}>
                <View style={[styles.arrow]} />
                <View style={styles.dot} />
              </View>
            </Marker>
            <Circle
              center={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
              radius={coords.accuracy}
              strokeColor="rgba(0, 150, 255, 0.5)"
              fillColor="rgba(0, 150, 255, 0.5)"
            />
            {atmCoords.map((coordinate, index) => (
                <Marker
                  key={index}
                  coordinate={coordinate}
                  title={`bank ${index+1}`}
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
