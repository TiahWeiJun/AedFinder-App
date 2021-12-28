import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import jsonData from "../data/Aed.json";
import AedModal from "../components/AedModal";
import { API_KEY } from "../env";

// Geocoder.init("AIzaSyBxkvfu6PiHpYDRaFniCHOFaKIu12I0geA");
Geocoder.init(API_KEY);

export default MapScreen = () => {
  const [currentCoords, setCurrentCoords] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });

  const [aedList, setAedList] = useState(jsonData.aed);
  const [aedModal, setAedModal] = useState(false);
  const [aedIndex, setAedIndex] = useState();

  useEffect(() => {
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: currentCoords.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      (error) => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const closeModal = () => {
    setAedModal(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: currentCoords.latitude,
          longitude: currentCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={() => closeModal()}
      >
        <Marker
          coordinate={{
            latitude: currentCoords.latitude,
            longitude: currentCoords.longitude,
          }}
        />

        {aedList.map((obj, i) => {
          const lat = parseFloat(obj.LATITUDE);
          const lng = parseFloat(obj.LONGITUDE);

          if (
            Math.abs(lat - currentCoords.latitude) <= 0.00008 ||
            Math.abs(lng - currentCoords.longitude) <= 0.00008
          ) {
            return (
              <Marker
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
                key={i}
                onPress={() => {
                  setAedModal(true);
                  setAedIndex(i);
                }}
              >
                <Image
                  source={{
                    uri: "https://heartsinelive.s3.amazonaws.com/uploads/2013/11/AED_Logo_USA.jpg",
                  }}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
              </Marker>
            );
          }
        })}
      </MapView>
      <StatusBar style="auto" />
      {
        <AedModal
          visible={aedModal}
          closeModal={closeModal}
          aedInfo={aedList[aedIndex]}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
